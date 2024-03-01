import { CalculateWinnerAction } from "@/types/actions/calcWinner";
import { Game } from "@/types/game";
import { getTrickWinner } from "../compareCards";
import { Phase } from "@/types/phase";
import switchPhase from "../switchPhase";

export default function calcWinner(game: Game, action: CalculateWinnerAction) {
    if (game.phase !== Phase.CalculateWinner) throw new Error(`Tried to take a Calc action during ${game.phase} phase.`)

    // make sure there is an established hand
    if (!game.hand) {
        throw new Error(`Hand was not established`)
    }

    // make sure trump suit is set
    if (!game.hand.trumpSuit) {
        throw new Error(`Trump suit was never selected`)
    }

    // add one to the winning team's tally for this hand
    const winner = getTrickWinner(game.trick, game.hand.trumpSuit);
    if (!winner) {
        throw new Error(`No valid cards were played somehow. This should never happen.`)
    }
    game.hand.score[winner.player.team] = game.hand.score[winner.player.team] + 1;

    // clear the trick
    game.trick = {
        plays: [],
        suit: null,
    }

    const cardsLeft = game.players.flatMap(a => a.hand).reduce((prev, card) => card ? prev + 1 : prev, 0)
    // if there are no more cards in players hands
    if (cardsLeft === 0) {
        // switch to updateScore phase
        switchPhase(game, Phase.UpdateScore);
        
        return game;
    }
    
    // otherwise we go back to play phase...
    // change player order to winner
    while (game.players[0].name !== winner.player.name) {
        const p = game.players.shift();
        if (!p) throw new Error(`Players array is empty!`)
        game.players.push(p);
    }

    // change phase to play
    switchPhase(game, Phase.Play);


    return game;
}
import { PlayAction } from "@/types/actions/play"
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import isValidPlay from "../isValidPlay"
import switchPhase from "../switchPhase"
import handWithoutCard from "../handWithoutCard"

export default function play(game: Game, action: PlayAction) {
    if (game.phase !== Phase.Play) throw new Error(`Tried to take a Play action during ${game.phase} phase.`)
    
    // make sure player hasn't played yet.
    for (let i = 0; i < game.trick.plays.length; i ++) {
        if (game.trick.plays[i].player === action.player) {
            throw new Error(`Player has already played! ${action.player}`)
        }
    }

    // make sure it is the players turn
    // the current player's turn is always game.players[0]
    if (game.players[0].name !== action.player.name) {
        throw new Error(`It is ${game.players[0].name}'s turn, not ${action.player.name}'s.`)
    }

    // make sure there is an established hand
    if (!game.hand) {
        throw new Error(`Hand was not established`)
    }

    // make sure trump suit is set
    if (!game.hand.trumpSuit) {
        throw new Error(`Trump suit was never selected`)
    }

    // make sure the play is valid
    if (!isValidPlay(action.card, game.trick.suit, game.hand.trumpSuit, action.player.hand)) {
        throw new Error(`Invalid card play! suit: ${JSON.stringify(game.trick.suit)}, card: ${JSON.stringify(action.card)}`)
    }
    // if this is the first play, set the trick suit
    if (game.trick.suit === null) {
        game.trick.suit = action.card.suit
    }

    // add the card to the trick
    game.trick.plays.push({ card: action.card, player: action.player })
    // remove the card from the players hand
    game.players = game.players.map((player) => {
        if (player.name === action.player.name) {
            player.hand = handWithoutCard(action.card, player.hand)
        }
        return player;
    })

    // shift the player order around
    const p1 = game.players.shift();
    if (!p1) {
        throw new Error('Players array is empty!');
    }
    game.players.push(p1);

    // if the trick has 4 cards in it, change game phase
    if (game.trick.plays.length > 4) {
        throw new Error('Too many cards were played!!');
    }
    if (game.trick.plays.length === 4) {
        switchPhase(game, Phase.CalculateWinner)
    }

    return game;
}
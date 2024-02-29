import { PlayAction } from "@/types/actions/play"
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import isValidPlay from "../isValidPlay"
import switchPhase from "../switchPhase"

export default function (game: Game, action: PlayAction) {
    if (game.phase !== Phase.Play) throw new Error(`Tried to take a Play action during ${game.phase} phase.`)
    
    // make sure player hasn't played yet.
    for (let i = 0; i < game.trick.plays.length; i ++) {
        if (game.trick.plays[i].player === action.player) {
            throw new Error(`Player has already played! ${action.player}`)
        }
    }

    // make sure it is the players turn
    // the current player's turn is always game.players[0]
    if (game.players[0] !== action.player) {
        throw new Error(`It is ${game.players[0].name}'s turn, not ${action.player.name}'s.`)
    }

    // make sure trump suit is set
    if (!game.trumpSuit) {
        throw new Error(`Trump suit was never selected`)
    }

    // make sure the play is valid
    if (!isValidPlay(action.card, game.trick.suit, game.trumpSuit)) {
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
            player.hand = player.hand.filter((card) => card !== action.card)
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
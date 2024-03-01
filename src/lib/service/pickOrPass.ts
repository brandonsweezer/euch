import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import switchPhase from "../switchPhase"
import { PickOrPass, PickOrPassAction } from "@/types/actions/pickOrPass"

export default function (game: Game, action: PickOrPassAction) {
    if (game.phase !== Phase.PickOrPass) throw new Error(`Tried to take a PickOrPass action during ${game.phase} phase.`)

    // check number of players
    if (game.players.length !== 4) {
        throw new Error(`Players array has incorrect number of players! (${game.players.length})`)
    }
    const player = game.players[0];
    // check correct order
    if (action.playerName !== player.name) {
        throw new Error(`Player ${action.playerName} has picked/passed out of order! It is ${player.name}'s turn!`)
    }

    if (!game.hand) {
        throw new Error(`Hand not established during pick/pass phase, should have happened in deal.`)
    }
    const dealer = game.players.find(p => p.name === game.hand?.dealer.name)
    if (!dealer) {
        throw new Error(`Dealer ${game.hand.dealer.name} doesn't exist in players array!`)
    }
    

    if (action.choice === PickOrPass.Pick) { // pick
        // if pick, give card to dealer and transition to discard phase
        const topCard = game.deck.shift();
        if (!topCard) {
            throw new Error(`Deck is empty during pick or pass phase.`)
        }
        dealer.hand.push(topCard);
        while (game.players[0] !== dealer) {
            const p = game.players.shift();
            if (!p) throw new Error(`This should never happen but whatever (no players)`)
            game.players.push(p);
        }

        game.hand.trumpSuit = topCard.suit
        const choosingTeam = game.players.find(p => p.name === action.playerName)?.team
        if (!choosingTeam) {
            throw new Error(`Could not find choosing team, player ${action.playerName} does not exist!`)
        }
        game.hand.choosingTeam = choosingTeam

        switchPhase(game, Phase.Discard)
    } else { // pass
        // if we ARE on the dealer, go to choose suit phase
        if (game.players[0].name === game.hand.dealer.name) {
            switchPhase(game, Phase.ChooseSuit);
        }
        // either way, go to next player.
        const p = game.players.shift()
        if (!p) {
            throw new Error(`Players array empty during pick/pass phase!`)
        }
        game.players.push(p);
    }    

    return game;
}
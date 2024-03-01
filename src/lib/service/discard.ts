import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import { DiscardAction } from "@/types/actions/discard"
import switchPhase from "../switchPhase"
import handWithoutCard from "../handWithoutCard"

export default function (game: Game, action: DiscardAction) {
    if (game.phase !== Phase.Discard) throw new Error(`Tried to take a Discard action during ${game.phase} phase.`)

    if (!game.hand) {
        throw new Error(`No hand established, should have been done in deal phase`)
    }

    const player = game.players.find(p => p.name === action.player.name)
    if (!player) {
        throw new Error(`Player ${action.player} does not exist, cannot discard this card.`)
    }

    // remove card from hand and put it back in the deck
    player.hand = handWithoutCard(action.card, player.hand);
    game.deck.push(action.card);

    // go to next player in order (this is the dealer doing the discarding)
    const p = game.players.shift()
    if (!p) throw new Error(`Players array empty!!`)
    game.players.push(p);

    switchPhase(game, Phase.Play);

    return game;
}
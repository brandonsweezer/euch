import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import switchPhase from "../switchPhase"
import { dealCards } from "../dealCards"
import { DealAction } from "@/types/actions/deal"

export default function deal(game: Game, action: DealAction) {
    if (game.phase !== Phase.Deal) throw new Error(`Tried to take a Deal action during ${game.phase} phase.`)

    // dealer is whoevers current turn it is.
    const dealer = game.players[0]
    if (!dealer) {
        throw new Error(`Player with name ${action.dealer} does not exist! Cannot deal cards.`)
    }

    // create hand (to set dealer)
    game.hand = {
        dealer,
        trumpSuit: null,
        choosingTeam: null,
        score: {
            'Red': 0,
            'Black': 0
        },
        goingAlone: []
    }

    dealCards({ deck: game.deck, players: game.players, dealerName: action.dealer });
    
    // transition to next phase
    switchPhase(game, Phase.PickOrPass)

    return game;
}
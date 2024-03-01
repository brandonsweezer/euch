import { Game } from "@/types/game"
import { Phase } from "@/types/phase"

import { ShuffleAction } from "@/types/actions/shuffle"
import { shuffleCards } from "../shuffleCards"
import switchPhase from "../switchPhase"

export default function (game: Game, action: ShuffleAction) {
    if (game.phase !== Phase.Shuffle) throw new Error(`Tried to take a Shuffle action during ${game.phase} phase.`)

    game.deck = shuffleCards();
    
    // transition to next phase
    switchPhase(game, Phase.Deal)

    return game;
}
import { Game } from "@/types/game";
import { Phase } from "@/types/phase";

export default function switchPhase(game: Game, newPhase: Phase) {
    if (!isValidNextPhase(game.phase, newPhase)) {
        throw new Error(`Invalid next phase. Phase ${newPhase} cannot follow phase ${game.phase}.`)
    }
    game.phase = newPhase
}

function isValidNextPhase(currentPhase: Phase, nextPhase: Phase) {
    switch (currentPhase) {
        case Phase.Lobby:
            return nextPhase === Phase.Shuffle || nextPhase === Phase.Lobby
        case Phase.Play:
            return nextPhase === Phase.CalculateWinner || nextPhase === Phase.Play
        default:
            return false;
    }
}
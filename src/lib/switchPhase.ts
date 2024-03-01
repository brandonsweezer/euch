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
        case Phase.Shuffle:
            return nextPhase === Phase.Deal
        case Phase.Deal:
            return nextPhase === Phase.PickOrPass
        case Phase.PickOrPass:
            return nextPhase === Phase.PickOrPass || nextPhase === Phase.ChooseSuit || nextPhase === Phase.Discard
        case Phase.ChooseSuit:
            return nextPhase === Phase.Play || nextPhase === Phase.ChooseSuit
        case Phase.Discard:
            return nextPhase === Phase.Play
        case Phase.CalculateWinner:
            return nextPhase === Phase.Play || nextPhase === Phase.UpdateScore
        case Phase.UpdateScore:
            return nextPhase === Phase.Shuffle || nextPhase === Phase.End
        default:
            return false;
    }
}
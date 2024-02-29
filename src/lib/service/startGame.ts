import { StartGameAction } from "@/types/actions/startGame";
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import switchPhase from "../switchPhase";

export default function (game: Game, action: StartGameAction) {
    if (game.phase !== Phase.Lobby) throw new Error(`Tried to start game during ${game.phase} phase.`)

    // transition to next phase
    switchPhase(game, Phase.Shuffle);

    return game;
}
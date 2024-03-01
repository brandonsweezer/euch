import { Game } from "@/types/game";
import { Phase } from "@/types/phase";
import switchPhase from "../switchPhase";
import { UpdateScoreAction } from "@/types/actions/updateScore";
import { getPointsScored } from "../points";

export default function updateScore(game: Game, action: UpdateScoreAction) {
    if (game.phase !== Phase.UpdateScore) throw new Error(`Tried to take a UpdateScore action during ${game.phase} phase.`)

    if (!game.hand) {
        throw new Error('Hand not set.')
    }

    // update game score
    const { points, winningTeam } = getPointsScored(game.hand);
    game.score[winningTeam] = game.score[winningTeam] + points;
    // change dealer to next in line
    const dealerName = game.hand.dealer.name
    while (game.players[0].name !== dealerName) {
        const p = game.players.shift();
        if (!p) throw new Error('players array empty');
        game.players.push(p);
    }
    // clear hand
    game.hand = null;

    // if winning team has 10 points, go to end
    if (game.score[winningTeam] >= 10) {
        switchPhase(game, Phase.End)
    } else { // otherwise we ball
        switchPhase(game, Phase.Shuffle);
    }


    return game;
}
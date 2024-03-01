import { Hand } from "@/types/hand";
import { Team } from "@/types/team";

export function getPointsScored (hand: Hand) {
    const redPoints = hand.score[Team.Red]
    const blackPoints = hand.score[Team.Black]
    const winningTeam = redPoints > blackPoints ? Team.Red : Team.Black;

    if (hand.goingAlone.length) {
        for (let soloPlayer of hand.goingAlone) {
            if (soloPlayer.team === winningTeam) {
                hand.score[soloPlayer.team] === 5;
                return { points: 5, winningTeam };
            } else {
                return { points: 0, winningTeam };
            }
        }
    }

    if (winningTeam === hand.choosingTeam) {
        return { points: 1, winningTeam };
    } else {
        return { points: 2, winningTeam };
    }
}
import { Game } from "@/types/game";
import { Team } from "@/types/team";

export default function getFinalScore(game: Game) {
    const redScore = game.score[Team.Red]
    const blackScore = game.score[Team.Black]
    const winningTeam = redScore > blackScore ? Team.Red : Team.Black;
    const winningMembers = game.players.filter((player) => player.team === winningTeam)
    return { winningTeam, winningMembers, redScore, blackScore }
}
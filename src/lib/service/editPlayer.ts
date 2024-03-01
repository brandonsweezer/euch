import { EditPlayerAction } from "@/types/actions/editPlayer";
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"

export default function editPlayer(game: Game, action: EditPlayerAction) {
    if (game.phase !== Phase.Lobby) throw new Error(`Tried to edit player during ${game.phase} phase.`)
    
    const player = game.players.find((player) => player.name === action.oldPlayerName)
    if (!player) {
        throw new Error(`No player found with the name ${action.oldPlayerName}`)
    }
    player.name = action.newPlayerName
    player.team = action.newPlayerTeam

    return game;
}
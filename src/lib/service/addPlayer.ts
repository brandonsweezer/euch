import { AddPlayerAction } from "@/types/actions/addPlayer";
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import { Player } from "@/types/player";

export default function (game: Game, action: AddPlayerAction) {
    if (game.phase !== Phase.Lobby) throw new Error(`Tried to edit player during ${game.phase} phase.`)
    
    // make sure this player doesn't already exist
    if (game.players.find((player) => player.name === action.playerName)) {
        throw new Error(`Player already exists! ${action.playerName}`)
    }

    const newPlayer: Player = {
        name: action.playerName,
        team: action.playerTeam,
        hand: []
    }
    game.players.push(newPlayer)

    return game;
}
import { Phase } from "@/types/phase";
import { NewGameRequest } from "./db/game";
import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { shuffleCards } from "./shuffleCards";

export default function createBlankGameRequest(): NewGameRequest {
    const players: Player[] = [
        {
            name: 'player1',
            team: Team.Red,
            hand: []
        },
        {
            name: 'player2',
            team: Team.Black,
            hand: []
        },
        {
            name: 'player3',
            team: Team.Red,
            hand: []
        },
        {
            name: 'player4',
            team: Team.Black,
            hand: []
        },
    ]
    const request: NewGameRequest = {
        players,
        score: { 'Red': 0, 'Black': 0 },
        phase: Phase.Lobby,
        deck: shuffleCards(),
        trick: { plays: [], suit: null },
        hand: null,
    }
    return request;
}
import { Phase } from "@/types/phase";
import { NewGameRequest } from "./db/game";

export default function createBlankGameRequest(): NewGameRequest {
    const request: NewGameRequest = {
        players: [],
        score: { 'team1': 0, 'team2': 0 },
        phase: Phase.Lobby,
        deck: [],
        trick: { plays: [], suit: null, winner: null },
        trumpSuit: null,
    }
    return request;
}
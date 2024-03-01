import { PlayerHand } from "./playerHand";
import { Team } from "./team";

export type Player = {
    name: string,
    hand: PlayerHand,
    team: Team,
}
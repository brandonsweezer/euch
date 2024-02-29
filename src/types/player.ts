import { Hand } from "./hand";
import { Team } from "./team";

export type Player = {
    name: string,
    hand: Hand,
    team: Team,
}
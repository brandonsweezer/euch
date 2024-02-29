import { Team } from "../team";

export type EditPlayerAction = {
    oldPlayerName: string,
    newPlayerName: string,
    newPlayerTeam: Team,
};
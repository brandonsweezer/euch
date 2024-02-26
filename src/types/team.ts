import { Player } from "./player"

export class Team {
    name: string;
    tricks: number;
    players: Player[];

    constructor({name, players}: {name: string, players: Player[]}) {
        this.name = name;
        this.players = players;
        this.tricks = 0;
    }
}
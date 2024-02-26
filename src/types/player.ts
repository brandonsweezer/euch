import { Hand } from "./hand";

export class Player {
    name: string;
    hand: Hand;

    constructor({name}: {name: string}) {
        this.name = name,
        this.hand = [];
    }
}
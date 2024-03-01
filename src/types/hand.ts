import { Player } from "./player";
import { Suit } from "./playingCard";
import { Score } from "./score";
import { Team } from "./team";

export type Hand = {
    dealer: Player
    trumpSuit: Suit | null
    score: Score
    choosingTeam: Team | null
    goingAlone: Player[]
}
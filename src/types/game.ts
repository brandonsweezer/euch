import { shuffleCards } from "@/lib/shuffleCards"
import { Team } from "./team"
import { PlayingCard } from "./playingCard"
import { Player } from "./player"
import { DealCards } from "@/lib/dealCards"
import { CardPlay, Trick } from "./trick"
import { establishTrick } from "@/lib/establishTrick"
import { Score } from "./score"
import { Phase } from "./phase"

export type Game = {
    _id: string,
    players: Player[],
    score: Score,
    phase: Phase,
    deck: PlayingCard[],
    trick: Trick
}
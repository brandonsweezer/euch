import { PlayingCard, Suit } from "./playingCard"
import { Player } from "./player"
import { Trick } from "./trick"
import { Score } from "./score"
import { Phase } from "./phase"
import { Hand } from "./hand"

export type Game = {
    _id: string
    players: Player[]
    score: Score
    phase: Phase
    deck: PlayingCard[]
    trick: Trick
    hand: Hand | null
}
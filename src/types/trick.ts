import { Player } from "./player"
import { PlayingCard, Suit } from "./playingCard"

export type Trick = {
    plays: CardPlay[]
    suit: Suit | null
}

export type CardPlay = {
    player: Player,
    card: PlayingCard
}

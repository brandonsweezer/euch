export type PlayingCard = {
    suit: Suit
    color: SuitColor
    rank: Rank
}

export enum Rank {
    Nine = "9",
    Ten = "10",
    Jack = "J",
    Queen = "Q",
    King = "K",
    Ace = "A",
}

export enum Suit {
    Hearts = "♥",
    Diamonds = "♦",
    Clubs = "♣",
    Spades = "♠"
}

export enum SuitColor {
    Red = "#CC3333",
    Black = "#111111"
}
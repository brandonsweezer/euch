import { Suit } from "@/types/playingCard";

export default function getLeftSuit(trumpSuit: Suit) {
    switch (trumpSuit) {
        case Suit.Clubs:
            return Suit.Spades
        case Suit.Spades:
            return Suit.Clubs
        case Suit.Diamonds:
            return Suit.Hearts
        case Suit.Hearts:
            return Suit.Diamonds
    }
}
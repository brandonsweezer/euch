import { Suit, SuitColor } from "@/types/playingCard";

export function getSuitColor(suit: Suit) {
    switch (suit) {
        case Suit.Clubs:
            return SuitColor.Black;
        case Suit.Spades:
            return SuitColor.Black;
        case Suit.Diamonds:
            return SuitColor.Red;
        case Suit.Hearts:
            return SuitColor.Red;
        default:
            return SuitColor.Black;
    }
}
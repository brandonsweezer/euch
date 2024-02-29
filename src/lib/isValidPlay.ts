import { PlayingCard, Rank, Suit } from "@/types/playingCard";
import { getSuitColor } from "./getSuitColor";

export default function isValidPlay(card: PlayingCard, suit: Suit | null, trumpSuit: Suit) {
    if (suit === null) {
        return true;
    }
    if (card.suit === suit) {
        return true;
    }
    if (card.rank === Rank.Jack) {
        const cardSuitColor = card.color;
        const trumpSuitColor = getSuitColor(trumpSuit);
        if (cardSuitColor ===  trumpSuitColor) {
            return true;
        }
    }

    return false;
}
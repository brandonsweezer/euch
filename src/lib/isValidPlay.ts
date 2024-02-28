import { PlayingCard, Rank, Suit } from "@/types/playingCard";
import { getSuitColor } from "./getSuitColor";

export default function isValidPlay(card: PlayingCard, suit: Suit) {
    if (card.suit === suit) {
        return true;
    }
    if (card.rank === Rank.Jack) {
        const cardSuitColor = card.color;
        const suitColor = getSuitColor(suit);
        if (cardSuitColor === suitColor) {
            return true;
        }
    }

    return false;
}
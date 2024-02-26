import { CardPlay } from "@/types/trick";

export function establishTrick(cardPlay: CardPlay) {
    const trick = {
        plays: [],
        suit: cardPlay.card.suit,
        winner: cardPlay.player
    }
    return trick;
}
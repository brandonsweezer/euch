import { PlayingCard, Rank, Suit, SuitColor } from "@/types/playingCard";
import { getSuitColor } from "./getSuitColor";

export function shuffleCards(cards?: PlayingCard[]): PlayingCard[] {
    const allCards = cards ? cards : getAllCards();

    for (let i = 0; i < allCards.length; i++) {
        // random index between 0 and length - 1
        const j = Math.floor(Math.random() *  allCards.length);
        const card1 = allCards[i];
        const card2 = allCards[j];
        allCards[i] = card2;
        allCards[j] = card1;
    }

    return allCards;
}

function getAllCards(): PlayingCard[] {
    const allCards = [];
    for (let suit of Object.values(Suit)) {
        for (let rank of Object.values(Rank)) {
            const card: PlayingCard = {
                suit,
                rank,
                color: getSuitColor(suit),
            }
            allCards.push(card);
        }
    }
    return allCards;
}
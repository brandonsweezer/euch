import { PlayingCard, Rank, Suit } from "@/types/playingCard";
import { getSuitColor } from "./getSuitColor";

export default function isValidPlay(card: PlayingCard, suit: Suit | null, trumpSuit: Suit, restOfHand: PlayingCard[]) {
    if (matchesSuit(card, suit, trumpSuit)) {
        return true;
    }
    // see if any other card in their hand is valid
    for (let otherCard of restOfHand) {
        if (matchesSuit(otherCard, suit, trumpSuit)) {
            // they have something to play, so this one isn't valid
            return false;
        }
    }

    // if we reached this point that means the player had no valid cards to play
    // and therefore they can play anything
    return true;
}

function matchesSuit(card: PlayingCard, suit: Suit | null, trumpSuit: Suit) {
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
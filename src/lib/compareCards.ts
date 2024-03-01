import { PlayingCard, Rank, Suit } from "@/types/playingCard";
import { CardPlay, Trick } from "@/types/trick";
import { getSuitColor } from "./getSuitColor";

export function getTrickWinner(trick: Trick, trumpSuit: Suit) {
    // it's either the highest rank card of trump suit
    // or the highest rank card of trick suit
    const sortedByRank = trick.plays.sort((b, a) => compareRanks(a.card.rank, b.card.rank))

    let highestOfTrickSuit: CardPlay | undefined = undefined;
    for (let cardPlay of sortedByRank) {
        if (isTrumpSuit(cardPlay.card, trumpSuit)) {
            return cardPlay
        } else if (cardPlay.card.suit === trick.suit && !highestOfTrickSuit) {
            highestOfTrickSuit = cardPlay
        }
    }
    return highestOfTrickSuit;
}

export function isTrumpSuit(card: PlayingCard, trumpSuit: Suit) {
    if (card.suit === trumpSuit) {
        return true;
    }

    if (card.rank === Rank.Jack) {
        if (getSuitColor(card.suit) === getSuitColor(trumpSuit)) {
            return true;
        }
    }
    return false;
}

export function compareRanks(rank1: Rank, rank2: Rank) {
    const rankOrder = {
        [Rank.Nine]: 0,
        [Rank.Ten]: 1,
        [Rank.Jack]: 2,
        [Rank.Queen]: 3,
        [Rank.King]: 4,
        [Rank.Ace]: 5,
    }

    if (rankOrder[rank1] < rankOrder[rank2]) {
        return -1
    } else if (rankOrder[rank1] > rankOrder[rank2]) {
        return 1
    }

    return 0
}
import { PlayingCard, Rank, Suit } from "@/types/playingCard";
import { CardPlay, Trick } from "@/types/trick";
import { getSuitColor } from "./getSuitColor";
import getLeftSuit from "./getLeftSuit";

export function getTrickWinner(trick: Trick, trumpSuit: Suit) {
    // it's either the highest rank card of trump suit
    // or the highest rank card of trick suit
    const sortedByRank = trick.plays.sort((a, b) => compareRanks(a.card.rank, b.card.rank))
    // find left and right, if they exist one of them wins.
    const left = sortedByRank.find((cardPlay) => cardPlay.card.rank === Rank.Jack && cardPlay.card.suit === getLeftSuit(trumpSuit))
    const right = sortedByRank.find((cardPlay) => cardPlay.card.rank === Rank.Jack && cardPlay.card.suit === trumpSuit)
    if (right) {
        return right
    }
    if (left) {
        return left
    }

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
        [Rank.Nine]: 5,
        [Rank.Ten]: 4,
        [Rank.Jack]: 3,
        [Rank.Queen]: 2,
        [Rank.King]: 1,
        [Rank.Ace]: 0,
    }

    if (rankOrder[rank1] < rankOrder[rank2]) {
        return -1
    } else if (rankOrder[rank1] > rankOrder[rank2]) {
        return 1
    }

    return 0
}
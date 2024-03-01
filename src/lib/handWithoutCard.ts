import { PlayingCard } from "@/types/playingCard";

export default function handWithoutCard(card: PlayingCard, hand: PlayingCard[]) {
    return hand.filter(handCard => (card.suit !== handCard.suit) || (card.rank !== handCard.rank) )
}
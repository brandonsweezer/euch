import { Player } from "@/types/player";
import { PlayingCard } from "@/types/playingCard";

export function DealCards({ cards, players }: { cards: PlayingCard[], players: Player[] }) {
    let cardsDealt = 0;
    let playerIndex = 0;
    // always deal 20 cards. 5 for each player
    while (cardsDealt < 20) {
        const card = cards.shift();
        if (!card) {
            throw new Error('Deck did not have enough cards to deal everyone out.')
        }
        
        const player = players[playerIndex];
        player.hand.push(card)
        playerIndex = (playerIndex + 1) % 4
        cardsDealt += 1;
    }
    return players;
}
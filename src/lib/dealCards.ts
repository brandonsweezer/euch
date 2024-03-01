import { Player } from "@/types/player";
import { PlayingCard } from "@/types/playingCard";

export function dealCards({ deck, players, dealerName }: { deck: PlayingCard[], players: Player[], dealerName: string }) {
    // shift and push until dealer is last in order
    while (players[3].name !== dealerName) {
        const p = players.shift()
        if (!p) throw new Error(`Players array is empty during deal phase!`)
        players.push(p);
    }

    let cardsDealt = 0;
    let playerIndex = 0;
    // always deal 20 cards. 5 for each player
    while (cardsDealt < 20) {
        const card = deck.shift();
        if (!card) {
            throw new Error('Deck did not have enough cards to deal everyone out.')
        }
        
        const player = players[playerIndex];
        player.hand.push(card)
        playerIndex = (playerIndex + 1) % 4
        cardsDealt += 1;
    }
    return { deck, players };
}
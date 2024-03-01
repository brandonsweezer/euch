import isValidPlay from "@/lib/isValidPlay";
import { Game } from "@/types/game"
import { PlayingCard } from "@/types/playingCard";
import { Button, Flex } from "@chakra-ui/react"

export default function Play(
    {   
        game,
        setGame,
        playerName,
        selectedCard
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
        selectedCard?: PlayingCard
    }) {
        const discard = () => {
            fetch(`/api/game/${game._id}/play`, {
                method: 'POST',
                body: JSON.stringify({
                    player,
                    card: selectedCard
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }
        const player = game.players.find(p => p.name === playerName)
        const notMyTurn = !game.players.length || game.players[0].name !== playerName
        const canPlayCard = () => {
            if (!player) return false;
            if (notMyTurn) return false;
            const trumpSuit = game.hand?.trumpSuit
            if (!trumpSuit) return false;
            if (!selectedCard) return false;
            if (!isValidPlay(selectedCard, game.trick.suit, trumpSuit, player.hand)) return false;

            return true;
        }

    return (
        <Flex mx={'auto'}>
            <Button size={'lg'} onClick={discard} isDisabled={!canPlayCard()}>Play</Button>
        </Flex>
    )
}
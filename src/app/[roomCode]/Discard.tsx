import { Game } from "@/types/game"
import { PlayingCard } from "@/types/playingCard";
import { Button, Flex } from "@chakra-ui/react"

export default function Discard(
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
            fetch(`/api/game/${game._id}/discard`, {
                method: 'POST',
                body: JSON.stringify({
                    player: game.hand?.dealer,
                    card: selectedCard
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

    return (<Flex mx={'auto'}>
        <Button size={'lg'} onClick={discard} disabled={!selectedCard}>Discard</Button>
    </Flex>)
}
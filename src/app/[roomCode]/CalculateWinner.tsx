import { getTrickWinner } from "@/lib/compareCards";
import { Game } from "@/types/game"
import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard";

export default function CalculateWinner(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const nextTrick = () => {
            fetch(`/api/game/${game._id}/calcWinner`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }
        const winner = game.hand && game.hand.trumpSuit ? getTrickWinner(game.trick, game.hand.trumpSuit) : null;

    return (
        <Stack mx={'auto'}>
            {winner && 
                <Stack>
                    <Text>Winning Team: {JSON.stringify(winner.player.team)}</Text>
                    {winner && <PlayingCard card={winner.card} faceUp />}
                </Stack>
            }
            <Button onClick={nextTrick}>Next Trick</Button>
        </Stack>
    )
}
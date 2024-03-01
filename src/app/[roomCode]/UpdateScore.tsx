import { getTrickWinner } from "@/lib/compareCards";
import { Game } from "@/types/game"
import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import PlayingCard from "./PlayingCard";
import { Team } from "@/types/team";
import { getPointsScored } from "@/lib/points";

export default function UpdateScore(
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
            fetch(`/api/game/${game._id}/updateScore`, {
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
        
        const { points, winningTeam } = game.hand ? getPointsScored(game.hand) : { points: 'unknown', winningTeam: 'unknown' };
        

    return (
        <Stack mx={'auto'}>
            {winningTeam && 
                <Stack>
                    <Text>Winning Team: {winningTeam}</Text>
                    <Text>Points Scored: {points}</Text>
                </Stack>
            }
            <Button onClick={nextTrick}>Next Trick</Button>
        </Stack>
    )
}
import { Game } from "@/types/game"
import { Button } from "@chakra-ui/react"

export default function Shuffle(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const shuffle = () => {
            fetch(`/api/game/${game._id}/shuffle`, {
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

    return (<>
        <Button onClick={shuffle}>Shuffle</Button>
    </>)
}
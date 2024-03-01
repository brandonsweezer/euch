import { Game } from "@/types/game"
import { Button } from "@chakra-ui/react"

export default function Deal(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const deal = () => {
            fetch(`/api/game/${game._id}/deal`, {
                method: 'POST',
                body: JSON.stringify({
                    dealer: playerName
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

    return (<>
        <Button onClick={deal}>Deal</Button>
    </>)
}
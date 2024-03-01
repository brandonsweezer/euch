import { Game } from "@/types/game"
import { Button, Flex } from "@chakra-ui/react"

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

        const notMyTurn = !game.players.length || game.players[0].name !== playerName

    return (<Flex mx={'auto'}>
        <Button isDisabled={notMyTurn} onClick={shuffle}>Shuffle</Button>
    </Flex>)
}
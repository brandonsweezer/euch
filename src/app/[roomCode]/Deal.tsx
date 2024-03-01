import { Game } from "@/types/game"
import { Button, Flex } from "@chakra-ui/react"

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

        const notMyTurn = !game.players.length || game.players[0].name !== playerName

    return (<Flex mx={'auto'}>
        <Button isDisabled={notMyTurn} onClick={deal}>Deal</Button>
    </Flex>)
}
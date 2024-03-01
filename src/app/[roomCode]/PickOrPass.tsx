import { Game } from "@/types/game"
import { PickOrPass as PickOrPassChoice } from "@/types/actions/pickOrPass";
import { Button, Flex } from "@chakra-ui/react"

export default function PickOrPass(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const pick = () => {
            fetch(`/api/game/${game._id}/pickOrPass`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName: playerName,
                    choice: PickOrPassChoice.Pick
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

        const pass = () => {
            fetch(`/api/game/${game._id}/pickOrPass`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName: playerName,
                    choice: PickOrPassChoice.Pass
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

        const notMyTurn = !game.players.length || game.players[0].name !== playerName

    return (<Flex mx={'auto'} gap={2}>
        <Button size={'lg'} onClick={pick} isDisabled={notMyTurn}>Take it</Button>
        <Button size={'lg'} onClick={pass} isDisabled={notMyTurn}>Pass</Button>
    </Flex>)
}
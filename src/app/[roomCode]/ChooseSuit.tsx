import { getSuitColor } from "@/lib/getSuitColor";
import { Game } from "@/types/game"
import { Suit } from "@/types/playingCard";
import { Button, Divider, Flex, Stack, Text } from "@chakra-ui/react"

export default function ChooseSuit(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const chooseSuit = (suit: Suit) => {
            fetch(`/api/game/${game._id}/chooseSuit`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName: playerName,
                    suit
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

        const pass = () => {
            fetch(`/api/game/${game._id}/chooseSuit`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName: playerName,
                    suit: null
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const gameState = await res.json();
                    setGame(gameState);
                }
            }).catch(console.error);
        }

        const notMyTurn = !game.players.length || game.players[0].name !== playerName

    return (
        notMyTurn ? 
            <Stack mx={'auto'} gap={2}>
                <Text>{game.players[0].name} is choosing the trump suit.</Text>
            </Stack>
                 : 
            <Stack mx={'auto'} gap={2}>
                <Text>Choose the trump suit:</Text> 
                <Flex gap={2}>
                    {Object.keys(Suit).map((suit) => (
                        <Stack 
                            key={suit}
                            onClick={() => chooseSuit(Suit[suit as keyof typeof Suit])}
                            textAlign={'center'}
                            backgroundColor={"#CCCCCC"}
                            borderRadius={8}
                            w={'100px'}
                            h={'150px'}
                            borderColor={'black'}
                            cursor={notMyTurn ? 'not-allowed': 'pointer'}
                            >
                            <Text my={'auto'} color={getSuitColor(Suit[suit as keyof typeof Suit])} fontSize={'xxx-large'}>{Suit[suit as keyof typeof Suit]}</Text>
                        </Stack>
                    ))}
                </Flex>
                <Divider />
                <Button size={'lg'} onClick={pass} isDisabled={notMyTurn}>Pass</Button>
            </Stack>
    )
}
import getFinalScore from "@/lib/getFinalScore";
import { Game } from "@/types/game"
import { Team } from "@/types/team";
import { Button, Flex, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function End(
    {   
        game,
        setGame,
        playerName,
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
    }) {
        const router = useRouter();
        const { winningTeam, winningMembers, redScore, blackScore } = getFinalScore(game);

    return (
        <Stack textAlign={'center'} mx={'auto'}>
            <Text>{winningTeam} team won!</Text>
            <Text>Congratulations {winningMembers[0].name} and {winningMembers[1].name}!</Text>
            <Text>Final Score</Text>
            <Text>{redScore} - {blackScore}</Text>
            <Button onClick={() => router.replace('/')}>Back to home!</Button>
        </Stack>
    )
}
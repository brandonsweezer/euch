import { Game } from "@/types/game";
import { Team } from "@/types/team";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function ScoreBoard({ game }: { game: Game }) {
    return (
        <Table variant={"unstyled"}>
            <Thead>
                <Tr>
                    <Th>Team</Th>
                    <Th>Points</Th>
                    <Th>Tricks</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr backgroundColor={"#402020"} color={'white'}>
                    <Td>{Team.Red}</Td>
                    <Td>{game.score[Team.Red]}</Td>
                    <Td>{game.hand?.score[Team.Red]}</Td>
                </Tr>
                <Tr backgroundColor={"#202020"} color={'white'}>
                    <Td>{Team.Black}</Td>
                    <Td>{game.score[Team.Black]}</Td>
                    <Td>{game.hand?.score[Team.Black]}</Td>
                </Tr>
            </Tbody>
        </Table>
)

}
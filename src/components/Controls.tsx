import { Game } from "@/types/game";
import { Button, Flex } from "@chakra-ui/react";

export default function Controls({game, playerName,
    onDeal,
    }: {game: Game, playerName: string
        onDeal: () => void
    }) {
    return (
        <Flex>
            <Button onClick={onDeal} colorScheme="blue">Deal</Button>
        </Flex>
    )

}
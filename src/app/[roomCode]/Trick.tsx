import { Trick } from "@/types/trick";
import { Flex, Stack, Text } from "@chakra-ui/react";
import PlayingCard from "./PlayingCard";

export default function Trick({ trick }: {trick: Trick}) {
    return (
        <Flex minHeight={'150px'} minWidth={'400px'}>
            {trick.plays.map((cardPlay) => 
                <Stack key={`${cardPlay.player.name}`} textAlign={'center'}>
                    <Text>{cardPlay.player.name}</Text>
                    <PlayingCard card={cardPlay.card} faceUp />
                </Stack>
            )}
        </Flex>
    )
}
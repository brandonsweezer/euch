import { PlayingCard } from "@/types/playingCard";
import { Stack, Text } from "@chakra-ui/react";

export default function PlayingCard({ card, faceUp } : { card: PlayingCard, faceUp: boolean }) {
    return (
        faceUp ? 
            <Stack color={card.color} backgroundColor={"CCCCCC"}>
                <Text fontSize={'xx-large'}>{card.suit}</Text>
                <Text fontSize={'xx-large'}>{card.rank}</Text>
                <Text fontSize={'xx-large'}>{card.suit}</Text>
            </Stack>
            : 
            <Stack backgroundColor={"303030"}>
                <Text fontSize={'xx-large'}>???</Text>
                <Text fontSize={'xx-large'}>???</Text>
                <Text fontSize={'xx-large'}>???</Text>
            </Stack>
    )
}
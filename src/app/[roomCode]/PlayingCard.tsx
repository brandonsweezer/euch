import { PlayingCard } from "@/types/playingCard";
import { Stack, Text } from "@chakra-ui/react";

export default function PlayingCard({
    card, 
    faceUp, 
    selectCard, 
    selected
} : {
    card: PlayingCard, 
    faceUp: boolean,
    selectCard?: (card: PlayingCard) => void,
    selected?: boolean,
}) {
    return (
        faceUp ? 
            <Stack
                cursor={'pointer'}
                onClick={() => selectCard?.(card)}
                color={card.color}
                backgroundColor={"#CCCCCC"}
                width={selected ? "150px" : "100px"}
                height={selected ? "225px" : "150px"}
                textAlign={'center'}
                borderRadius={8}
                border={"#000000"}
                borderStyle={'solid'}
                justifyContent={'space-evenly'}
                >
                <Text fontSize={selected ? 'xxx-large' : 'xx-large'}>{card.suit}</Text>
                <Text fontSize={selected ? 'xxx-large' : 'xx-large'}>{card.rank}</Text>
                <Text fontSize={selected ? 'xxx-large' : 'xx-large'}>{card.suit}</Text>
            </Stack>
            : 
            <Stack backgroundColor={"#108888"}
                width={"100px"}
                height={"150px"}
                textAlign={'center'}
                border={"#CCCCCC"}
                borderRadius={8}
                borderStyle={"solid"}
                justifyContent={'space-evenly'}
                >
                <Text fontSize={'xx-large'}></Text>
                <Text fontSize={'xx-large'}></Text>
                <Text fontSize={'xx-large'}></Text>
            </Stack>
    )
}
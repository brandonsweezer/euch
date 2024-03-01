import { PlayingCard as card } from "@/types/playingCard";
import { Box, Flex, Stack } from "@chakra-ui/react";
import PlayingCard from "./PlayingCard";

export default function Deck({cards, flipTop}: {cards: card[], flipTop: boolean}) {
    return (
        <Flex gap={1} wrap={'wrap'} position={'relative'} minWidth={'200px'} minHeight={'150px'}>
            {cards.map((card, i) => 
                <Box position={'absolute'} ml={`${i*8}px`} key={`${card.rank}-${card.suit}`} zIndex={-i}>
                    <PlayingCard card={card} faceUp={i === 0 && flipTop} />
                </Box>
            )}
        </Flex>
    )
}
import { PlayingCard } from "@/types/playingCard";
import { Box, Card, CardBody } from "@chakra-ui/react";
import { useState } from "react";

export default function PlayingCard({ card, faceDown, selectCard }: {
        card: PlayingCard,
        faceDown?: boolean,
        selectCard?: (card: PlayingCard) => void
    }) {

    return (
        <Card
            onClick={() => selectCard?.(card)}
            width={"100px"}
            height={"150px"}
            backgroundColor={faceDown ? "#6e6e6e" : "#e6e6e6"}
            rounded={8}
            p={0}
        >
            {!faceDown &&
                <CardBody _hover={{cursor: 'pointer'}}
                    display={'flex'}
                    flexDir={'column'}
                    textAlign={'center'}
                    p={0}
                    >
                    <Box color={card.color} fontSize={'xx-large'}>
                        {card.suit}
                    </Box>
                    <Box color={card.color} fontSize={'xx-large'}>
                        {card.rank}
                    </Box>
                    <Box color={card.color} fontSize={'xx-large'}>
                        {card.suit}
                    </Box>
                </CardBody>
            }
        </Card>
    )
}
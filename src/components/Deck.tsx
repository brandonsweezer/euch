import { PlayingCard as pc } from "@/types/playingCard";
import { Box } from "@chakra-ui/react";
import PlayingCard from "./PlayingCard";

export default function Deck({ deck }: { deck: pc[] }) {
    return (
        <Box position={'relative'}>
            {deck.map((card, index) => 
            <Box key={`${card.rank}${card.suit}`} position={'absolute'} mr={20 * index}>
                <PlayingCard card={card} faceDown />
            </Box>
            )}
        </Box>
      )
}
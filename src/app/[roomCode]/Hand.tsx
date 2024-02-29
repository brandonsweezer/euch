import { Flex } from "@chakra-ui/react";
import { PlayingCard as pc } from "@/types/playingCard";
import PlayingCard from "./PlayingCard";

export default function Hand({ cards }: { cards: pc[] }) {
    return <Flex>
        {cards.map((card) => 
            <PlayingCard faceUp card={card} />
        )}
    </Flex>
}
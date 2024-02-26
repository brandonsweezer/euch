import { Trick } from "@/types/trick";
import { Flex } from "@chakra-ui/react";
import PlayingCard from "./PlayingCard";

export default function Trick({ trick }: {trick: Trick}) {
    return (
        <Flex dir="column">
            <Flex>
                {trick.plays.map((cardPlay) => <PlayingCard 
                    key={`${cardPlay.card.rank}${cardPlay.card.suit}`}
                    card={cardPlay.card}
                />)}
            </Flex>
        </Flex>
    )
}
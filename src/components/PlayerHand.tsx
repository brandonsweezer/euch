import { Player } from "@/types/player";
import { CardPlay } from "@/types/trick";
import { Flex } from "@chakra-ui/react";
import PlayingCard from "./PlayingCard";
import { PlayingCard as PC } from "@/types/playingCard";

export default function PlayerHand({ player, playCard, faceDown }: {
        player: Player,
        playCard?: (cardPlay: CardPlay) => void,
        faceDown?: boolean,
    }) {

    const handleCardPlay = (card: PC) => {
        playCard?.({ player, card })
    }

    return (
        <Flex dir="column" key={player.name}>
            {player.name}
            <Flex>
                {player.hand.map((card) => 
                    <PlayingCard key={`${card.rank}${card.suit}`} card={card} faceDown={faceDown} selectCard={handleCardPlay} />
                )}
            </Flex>
        </Flex>
    )
}
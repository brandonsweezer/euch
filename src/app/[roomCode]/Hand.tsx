import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { PlayingCard as pc } from "@/types/playingCard";
import PlayingCard from "./PlayingCard";
import { TriangleUpIcon } from "@chakra-ui/icons";
import { Player } from "@/types/player";
import { Team } from "@/types/team";

export default function Hand({ player, faceUp, myTurn, selectCard, selectedCard }: { player: Player, faceUp?: boolean, myTurn?: boolean, selectCard?: (card: pc) => void, selectedCard?: pc }) {
    return (
        <Stack backgroundColor={player.team === Team.Red ? '#402020' : '#202020'} px={8} py={4}>    
            <Flex gap={4} my={'auto'} justifyContent={'space-between'}>
                <Text my={'auto'}>{`${player.name}`}</Text>
                {myTurn && <TriangleUpIcon fontSize={'xxx-large'} />}
            </Flex>
            <Flex gap={2} align={'end'}>
                {player.hand.map((card: pc) => 
                    <PlayingCard key={`${card.rank}-${card.suit}`} faceUp={!!faceUp} card={card}
                        selectCard={selectCard} selected={card === selectedCard}
                    />
                )}
            </Flex>
        </Stack>
    )
}
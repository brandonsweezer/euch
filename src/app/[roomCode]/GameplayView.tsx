import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import Hand from "./Hand";
import { Game } from "@/types/game";
import Deck from "./Deck";
import { Phase } from "@/types/phase";
import Trick from "./Trick";
import { PlayingCard, Suit } from "@/types/playingCard";
import { getSuitColor } from "@/lib/getSuitColor";
import ScoreBoard from "./Scoreboard";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function GameplayView({
        game,
        playerName,
        children,
        selectCard,
        selectedCard
    }: { 
        game: Game,
        playerName: string,
        children: ReactNode 
        selectCard: (card: PlayingCard) => void
        selectedCard?: PlayingCard
    }) {
        const flipTopOfDeck = game.phase === Phase.PickOrPass;
        const player = game.players.find(p => p.name === playerName)
        const otherPlayers = game.players.filter(p => p.name !== playerName)
        const turn = game.players[0]?.name

    return (
        <Stack backgroundColor={"#202030"} height={'100%'} w={'100%'}>
            <Text textAlign={'center'} fontSize="xxx-large">{game.phase} Phase</Text>
            <Flex>
                <Flex width={'50%'}>
                    <ScoreBoard game={game} />
                </Flex>
                <Flex width={'100%'}
                    color={'black'}
                    fontSize={'lg'}
                    fontWeight={'500'}
                    p={2}
                    gap={2}
                    backgroundColor={"#CCCCCC"}
                    justifyContent={'space-evenly'}
                    >
                    {game.hand?.dealer && <Stack textAlign={'center'}>
                        <Text>{`Dealer:`}</Text>
                        <Text my={'auto'}>{game.hand?.dealer.name}</Text>
                    </Stack>
                    }
                    {game.hand?.trumpSuit && <Stack textAlign={'center'}>
                        <Text>{`Trump Suit:`}</Text>
                        <Text
                            my={'auto'}
                            fontSize={'xxx-large'}
                            color={getSuitColor(game.hand.trumpSuit)}
                            >
                            {game.hand?.trumpSuit}
                        </Text>
                    </Stack>}
                    {game.hand?.choosingTeam && <Stack textAlign={'center'}>
                        <Text>{`Chosen by:`}</Text>
                        <Text my={'auto'}>{game.hand?.choosingTeam} team</Text>
                    </Stack>}
                    <Stack textAlign={'center'}>
                        <Text>{`Trick suit:`}</Text>
                        <Text 
                            fontSize={'xxx-large'}
                            color={getSuitColor(game.trick.suit ?? Suit.Spades)}
                            my={'auto'}
                            >{game.trick.suit ?? ''}
                        </Text>
                    </Stack>
                </Flex>
            </Flex>
            <Flex gap={16} justifyContent={'space-between'} mx={'10%'}>
                <Trick trick={game.trick} />
                <Deck cards={game.deck} flipTop={flipTopOfDeck} />
            </Flex>
            <Flex>
                {children}
            </Flex>
            <Flex mt={'auto'} justifyContent={'space-evenly'} w={'100%'} flexWrap={'wrap'} textAlign={'center'} gap={2}>
                {player && <Hand player={player} faceUp myTurn={playerName === turn} selectCard={selectCard} selectedCard={selectedCard} />}
                {otherPlayers && otherPlayers.map((p) => <Hand key={p.name} player={p} myTurn={p.name === turn} />)}
            </Flex>
        </Stack>
    )
}
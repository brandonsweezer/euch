import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import Hand from "./Hand";
import { Game } from "@/types/game";
import Deck from "./Deck";
import { Phase } from "@/types/phase";
import Trick from "./Trick";
import { PlayingCard } from "@/types/playingCard";
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

        // TODO: debug tool remove eventually
        const router = useRouter();
        const searchParams = useSearchParams();
        const pathname = usePathname();
        const switchPlayer = () => {
            const nextPlayer = game.players[0].name
            const params = new URLSearchParams(searchParams.toString());
            params.set('player', nextPlayer);
            router.push(pathname + '?' + params.toString())
            router.refresh();
        }
        

    return (
        <Stack backgroundColor={"#202030"} height={'100%'} w={'100%'}>
            <Button onClick={switchPlayer}>go to on-turn player</Button>
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
                    {game.hand?.dealer && <Stack>
                        <Text textAlign={'center'} >{`Dealer:`}</Text>
                        <Text my={'auto'}>{game.hand?.dealer.name}</Text>
                    </Stack>
                    }
                    {game.hand?.trumpSuit && <Stack>
                        <Text textAlign={'center'} >{`Trump Suit:`}</Text>
                        <Text
                            my={'auto'}
                            textAlign={'center'}
                            fontSize={'xxx-large'}
                            color={getSuitColor(game.hand.trumpSuit)}
                            >
                            {game.hand?.trumpSuit}
                        </Text>
                    </Stack>}
                    {game.hand?.choosingTeam && <Stack>
                        <Text textAlign={'center'} >{`Chosen by:`}</Text>
                        <Text my={'auto'}>{game.hand?.choosingTeam} team</Text>
                    </Stack>}
                    <Stack>
                        <Text textAlign={'center'} >{`Trick suit:`}</Text>
                        <Text my={'auto'}>{game.trick.suit ?? 'Not played yet'}</Text>
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
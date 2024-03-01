"use client"

import createBlankGameRequest from "@/lib/createBlankGameRequest";
import { Game } from "@/types/game";
import { Suit, SuitColor } from "@/types/playingCard";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [roomCode, setRoomCode] = useState<string>();

  const newGame = () => {
    fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify(createBlankGameRequest())
    }).then(async (res) => {
      const newGame: Game = await res.json();
      router.push(newGame._id)
    }).catch(console.error)
  }

  return (
    <Stack 
      mx={'10%'}
      px={'10%'}
      pt={'10%'}
      textAlign={'center'}
      fontSize={'xxx-large'}
      height={'100%'}
      backgroundColor={"#101010"}
      >
      <Text>Let's play some Euchre!</Text>
      <Stack justifyContent={'space-between'} backgroundColor={'#303040'} borderRadius={8} py={'10%'}>
        <Flex justifyContent={'space-around'}>
          <Text color={SuitColor.Black}>{Suit.Spades}</Text>
          <Text color={SuitColor.Red}>{Suit.Hearts}</Text>
          <Text color={SuitColor.Black}>{Suit.Clubs}</Text>
          <Text color={SuitColor.Red}>{Suit.Diamonds}</Text>
        </Flex>
        <Flex px={'10%'} gap={8}>
          <Stack width={'100%'}>
            <Input size={'lg'} placeholder="Room Code" onChange={(e) => setRoomCode(e.target.value)} />
            <Button size={'lg'} onClick={() => router.push(`${roomCode}`)}>Join game</Button>
          </Stack>
          <Stack width={'100%'}>
            <Button size={'lg'} height={'100%'} onClick={newGame}>Start New Game</Button>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  )
}
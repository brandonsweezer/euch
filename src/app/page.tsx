"use client"

import Controls from "@/components/Controls";
import Deck from "@/components/Deck";
import PlayerHand from "@/components/PlayerHand";
import Trick from "@/components/Trick";
import { Game } from "@/types/game";
import { CardPlay } from "@/types/trick";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const game = useRef<Game>(new Game());
  const [playerName, setPlayerName] = useState('player 1');

  const deal = () => {
    console.log('dealing cards');
    game.current.dealCards();
  }

  const playCard = (cardPlay: CardPlay) => {
    game.current.playCard(cardPlay.player.name, cardPlay.card) 
  }

  useEffect(() => {
    console.log('game state change!')
  }, [game.current])

  return (
    <Flex dir={'column'} justifyContent={'space-between'}>
      <Flex gap={4} flexWrap={'wrap'}>
        {game.current.players.map((player) => 
          <PlayerHand key={player.name} player={player} faceDown={(playerName !== player.name)} playCard={(cardPlay) => 
            playerName === player.name ? playCard(cardPlay) : undefined
          } 
          />
        )}
        {game.current.trick && <Trick trick={game.current.trick} />}
        <Deck deck={game.current.deck} />
      </Flex>
      <Controls game={game.current} playerName={playerName}
        onDeal={deal}
      />
    </Flex>
  )
}
"use client"
import { Game } from "@/types/game";
import { Phase } from "@/types/phase";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Lobby from "./Lobby";
import Shuffle from "./Shuffle";
import GameplayView from "./GameplayView";

export default function RoomCode() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [gameState, setGameState] = useState<Game | undefined>();
    const [playerName, setPlayerName] = useState(searchParams.get('player') ?? '')
    const fetchingGame = useRef<boolean>(false);

    const getPhaseDisplay = () => {
        switch(gameState?.phase) {
            case Phase.Lobby:
                return <Lobby game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} editPlayerName={setPlayerName} />
            case Phase.Shuffle:
                return (
                    <GameplayView game={gameState}>
                        <Shuffle game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            default:
                return <>{JSON.stringify(gameState)}</>
        }
    }

    useEffect(() => {
        if (!fetchingGame.current) {
            fetchingGame.current = true;
            fetch(`/api/game/${params.roomCode}`, { method: 'GET' }).then(async (res) => {
                const gameState = await res.json();
                setGameState(gameState);
                fetchingGame.current = false;
            }).catch(console.log)
        }
    }, [])

    return (
        <>
            {gameState ? 
                    getPhaseDisplay()
                :
                <Stack>
                    <Spinner />
                </Stack>
            }
        </>
    )
}
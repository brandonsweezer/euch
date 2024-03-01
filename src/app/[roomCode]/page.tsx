"use client"
import { Game } from "@/types/game";
import { Phase } from "@/types/phase";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Lobby from "./Lobby";
import Shuffle from "./Shuffle";
import GameplayView from "./GameplayView";
import Deal from "./Deal";
import PickOrPass from "./PickOrPass";
import { PlayingCard } from "@/types/playingCard";
import Discard from "./Discard";
import Play from "./Play";
import CalculateWinner from "./CalculateWinner";
import UpdateScore from "./UpdateScore";
import Pusher from 'pusher-js';
import { NotificationType } from "@/types/notification";
import ChooseSuit from "./ChooseSuit";
import End from "./End";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '',
    forceTLS: true
});

export default function RoomCode() {
    const params = useParams();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [gameState, setGameState] = useState<Game | undefined>();
    const [playerName, setPlayerName] = useState(searchParams.get('player') ?? '')
    const fetchingGame = useRef<boolean>(false);

    const [selectedCard, setSelectedCard] = useState<PlayingCard>();
    const selectCard = (card: PlayingCard) => {
        setSelectedCard(card);
    }

    useEffect(() => {
        setSelectedCard(undefined);
    }, [gameState])

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('player', playerName);
        const url = `${pathname}?${newParams}`
        router.replace(url);
    }, [playerName])

    const getPhaseDisplay = () => {
        switch(gameState?.phase) {
            case Phase.Lobby:
                return <Lobby game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} editPlayerName={setPlayerName} />
            case Phase.Shuffle:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <Shuffle game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.Deal:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <Deal game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.PickOrPass:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <PickOrPass game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.ChooseSuit:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <ChooseSuit game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.Discard:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <Discard game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName}
                            selectedCard={selectedCard}
                         />
                    </GameplayView>
                )
            case Phase.Play:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <Play game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName}
                            selectedCard={selectedCard}
                            />
                    </GameplayView>
                )
            case Phase.CalculateWinner:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <CalculateWinner game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.UpdateScore:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <UpdateScore game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            case Phase.End:
                return (
                    <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>
                        <End game={gameState} setGame={(game: Game) => setGameState(game)} playerName={playerName} />
                    </GameplayView>
                )
            default:
                return (
                    gameState ? <GameplayView game={gameState} playerName={playerName} selectCard={selectCard} selectedCard={selectedCard}>{JSON.stringify(gameState)}</GameplayView>
                    : <>No game state</>
                )
        }
    }

    useEffect(() => {
        if (!fetchingGame.current) {
            fetchingGame.current = true;
            fetch(`/api/game/${params.roomCode}`, { method: 'GET' }).then(async (res) => {
                const gameState = await res.json();
                setGameState(gameState);
                fetchingGame.current = false;
            }).catch(console.error)
        }
    }, [])

    useEffect(function () {
        const channel = pusher.subscribe(`${params.roomCode}`);

        channel.bind(NotificationType.GameStateChange, function (data: Game) {
            setGameState(data);
        });

        return () => {
            pusher.unsubscribe(`${params.roomCode}`);
        };
    }, []);

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
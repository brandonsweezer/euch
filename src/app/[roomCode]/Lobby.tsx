import { AddPlayerAction } from "@/types/actions/addPlayer";
import { EditPlayerAction } from "@/types/actions/editPlayer";
import { Game } from "@/types/game";
import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { Button, Divider, Flex, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Lobby({ game,
        setGame,
        playerName,
        editPlayerName
    }: {
        game: Game,
        setGame: (game: Game) => void,
        playerName: string,
        editPlayerName: (name: string) => void
    }) {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerTeam, setNewPlayerTeam] = useState(Team.Red);

    const addPlayer = () => {
        fetch(`/api/game/${game._id}/lobby`,
        {
            method: 'POST',
            body: JSON.stringify({
                type: 'joinGame',
                action: {
                  playerName: newPlayerName,
                  playerTeam: newPlayerTeam  
                } as AddPlayerAction
            })
        }).then(async (res) => {
            if (res.status === 200) {
                const newGameState = await res.json()
                setGame(newGameState);
            }
        }).catch(console.error)
        editPlayerName(newPlayerName);
    }

    const editPlayer = (action: EditPlayerAction) => {
        fetch(`/api/game/${game._id}/lobby`,
        {
            method: 'POST',
            body: JSON.stringify({
                type: 'editPlayer',
                action
            })
        }).then(async (res) => {
            if (res.status === 200) {
                const newGameState = await res.json()
                setGame(newGameState);
            }
        }).catch(console.error)
    }

    const startGame = () => {
        fetch(`/api/game/${game._id}/lobby`,
        {
            method: 'POST',
            body: JSON.stringify({
                type: 'startGame',
                action: { playerName }
            })
        }).then(async (res) => {
            if (res.status === 200) {
                const newGameState = await res.json()
                setGame(newGameState);
            }
        }).catch(console.error)
    }

    const switchTeam = (player: Player) => {
        const otherTeam = player.team === Team.Red ? Team.Black : Team.Red
        editPlayer({ newPlayerName: player.name, oldPlayerName: player.name, newPlayerTeam: otherTeam })
    }

    const changeName = (player: Player) => {
        editPlayer({ newPlayerName, oldPlayerName: player.name, newPlayerTeam: player.team })
        editPlayerName(newPlayerName);
    }

    return (
        <Stack backgroundColor={"#202030"} mx={'10%'} p={'5%'} height={'100%'}>
            <Text fontSize={'xx-large'}>Lobby</Text>
            <Stack backgroundColor={"#202020"} p={4} gap={2}>
                <Flex justifyContent={'space-around'} gap={4}>
                    <Stack width={'100%'}>
                        <Text>Red Team</Text>
                        {game.players.filter((player) => player.team === Team.Red).map((player) => 
                            <Flex 
                                key={player.name}
                                backgroundColor={player.team === Team.Red ? "#302020" : "101010"}
                                textAlign={'center'}
                                justifyContent={'space-between'}
                                >
                                <Text>{player.name}</Text>
                                <Button onClick={() => switchTeam(player)}>Switch Team</Button>
                            </Flex>
                        )}
                    </Stack>
                    <Stack width={'100%'}>
                        <Text>Black Team</Text>
                        {game.players.filter((player) => player.team === Team.Black).map((player) => 
                            <Flex 
                                key={player.name}
                                backgroundColor={player.team === Team.Red ? "#302020" : "101010"}
                                textAlign={'center'}
                                justifyContent={'space-between'}
                                >
                                <Text>{player.name}</Text>
                                <Button onClick={() => switchTeam(player)}>Switch Team</Button>
                            </Flex>
                        )}
                    </Stack>
                </Flex>
                <Divider />
                { !playerName &&
                    <Flex gap={2}>
                        <Input placeholder="Player name" onChange={(e) => setNewPlayerName(e.target.value)}/>
                        <Select
                            width={'50%'}
                            placeholder="Team"
                            onChange={(e) => setNewPlayerTeam(e.target.value as Team)}
                            >
                            <option value={Team.Red}>Red Team</option>
                            <option value={Team.Black}>Black Team</option>
                        </Select>
                        <Button width={'50%'} onClick={addPlayer}>Join Game</Button>
                    </Flex>
                }
                {
                    playerName && game.players.length === 4 && 
                    <Button onClick={startGame}>Start Game!</Button>
                }
            </Stack>
        </Stack>
    )
}
import { StartGameAction } from "@/types/actions/startGame";
import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import switchPhase from "../switchPhase";
import { Team } from "@/types/team";

export default function (game: Game, action: StartGameAction) {
    if (game.phase !== Phase.Lobby) throw new Error(`Tried to start game during ${game.phase} phase.`)


    // make sure there are 4 players
    if (game.players.length !== 4) {
        throw new Error(`Wrong amount of players! (${game.players.length})`)
    }

    // set the correct player order
    const redTeam = [];
    const blackTeam = [];
    for (let player of game.players) {
        if (player.team === Team.Red) {
            redTeam.push(player);
        } else {
            blackTeam.push(player);
        }
    }
    game.players = [redTeam[0], blackTeam[0], redTeam[1], blackTeam[1]];

    // choose a random dealer
    const dealerIndex = Math.floor(Math.random() * 3);
    let i = 0;
    while (i !== dealerIndex) {
        const p = game.players.shift();
        if (!p) throw new Error('Players array empty!')
        game.players.push(p);
        i++;
    }

    // transition to next phase
    switchPhase(game, Phase.Shuffle);

    return game;
}
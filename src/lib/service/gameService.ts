import { Game } from "@/types/game";
import { gameRepository } from "../db/container";
import { PlayAction } from "@/types/actions/play";
import play from "./play";
import { NewGameRequest } from "../db/game";
import { EditPlayerAction } from "@/types/actions/editPlayer";
import editPlayer from "./editPlayer";
import { AddPlayerAction } from "@/types/actions/addPlayer";
import addPlayer from "./addPlayer";
import { StartGameAction } from "@/types/actions/startGame";
import startGame from "./startGame";

export const gameService = function (gameId: string) {
    return {
        getGame: async function () {
            return await gameRepository.readById(gameId);
        },
        newGame: async function (newGameRequest: NewGameRequest) {
            return await gameRepository.create(newGameRequest)
        },
        updateGameInDatabase: async function (game: Game) {
            const updatedGame = await gameRepository.update(game);
            return updatedGame;
        },
        editPlayer: async function (action: EditPlayerAction) {
            const game = await this.getGame();
            const newGameState = editPlayer(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        addPlayer: async function (action: AddPlayerAction) {
            const game = await this.getGame();
            const newGameState = addPlayer(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        startGame: async function (action: StartGameAction) {
            const game = await this.getGame();
            const newGameState = startGame(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        play: async function (action: PlayAction) {
            const game = await this.getGame();
            const newGameState = play(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },

    }
}
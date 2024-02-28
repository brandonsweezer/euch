import { Game } from "@/types/game";
import { gameRepository } from "../db/container";
import { PlayAction } from "@/types/actions/play";
import play from "./play";

export const gameService = function (gameId: string) {
    return {
        getGame: async function () {
            return await gameRepository.readById(gameId);
        },
        play: async function (action: PlayAction) {
            const game = await this.getGame();
            const newGameState = play(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        updateGameInDatabase: async function (game: Game) {
            const updatedGame = await gameRepository.update(game);
            return updatedGame;
        }
    }
}
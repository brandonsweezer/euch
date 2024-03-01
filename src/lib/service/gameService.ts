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
import { ShuffleAction } from "@/types/actions/shuffle";
import shuffle from "./shuffle";
import { DealAction } from "@/types/actions/deal";
import deal from "./deal";
import pickOrPass from "./pickOrPass";
import { PickOrPassAction } from "@/types/actions/pickOrPass";
import { DiscardAction } from "@/types/actions/discard";
import discard from "./discard";
import { CalculateWinnerAction } from "@/types/actions/calcWinner";
import calcWinner from "./calcWinner";
import { UpdateScoreAction } from "@/types/actions/updateScore";
import updateScore from "./updateScore";

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
        shuffle: async function (action: ShuffleAction) {
            const game = await this.getGame();
            const newGameState = shuffle(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        deal: async function (action: DealAction) {
            const game = await this.getGame();
            const newGameState = deal(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        pickOrPass: async function (action: PickOrPassAction) {
            const game = await this.getGame();
            const newGameState = pickOrPass(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        discard: async function (action: DiscardAction) {
            const game = await this.getGame();
            const newGameState = discard(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        play: async function (action: PlayAction) {
            const game = await this.getGame();
            const newGameState = play(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        calcWinner: async function (action: CalculateWinnerAction) {
            const game = await this.getGame();
            const newGameState = calcWinner(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },
        updateScore: async function (action: UpdateScoreAction) {
            const game = await this.getGame();
            const newGameState = updateScore(game, action);
            const updatedGameState = await this.updateGameInDatabase(newGameState);
            return updatedGameState;
        },

    }
}
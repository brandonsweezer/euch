import { Game } from "@/types/game"
import { Phase } from "@/types/phase"
import switchPhase from "../switchPhase"
import { ChooseSuitAction } from "@/types/actions/chooseSuit"

export default function chooseSuit(game: Game, action: ChooseSuitAction) {
    if (game.phase !== Phase.ChooseSuit) throw new Error(`Tried to take a ChooseSuit action during ${game.phase} phase.`)
    
    if (!game.hand) throw new Error('Hand not established!')
    // if we pick a suit, set the hand's trump suit and the team that picked it
    if (action.suit !== null) {
        const choosingPlayer = game.players.find(p => p.name === action.playerName);
        if (!choosingPlayer) throw new Error(`The player ${action.playerName} does not exist!`)
        game.hand.choosingTeam = choosingPlayer.team
        game.hand.trumpSuit = action.suit;

        // go to dealer + 1
        while (game.players[3].name !== game.hand.dealer.name) {
            const p = game.players.shift();
            if (!p) throw new Error('Players array empty!')
            game.players.push(p);
        }

        // then go to play phase
        switchPhase(game, Phase.Play);
    } else {
        // from this point on the player has passed.

        // if we are on the dealer, this is an illegal action
        // (dealer was sticked)
        if (action.playerName === game.hand.dealer.name) {
            throw new Error('Dealer must choose!');
        }

        // go to next player in order
        const p = game.players.shift();
        if (!p) throw new Error('Players array empty!')
        game.players.push(p);

        // then go back to this phase
        switchPhase(game, Phase.ChooseSuit);
    }

    return game;
}
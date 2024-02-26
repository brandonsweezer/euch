import { shuffleCards } from "@/lib/shuffleCards"
import { Team } from "./team"
import { PlayingCard } from "./playingCard"
import { Player } from "./player"
import { DealCards } from "@/lib/dealCards"
import { CardPlay, Trick } from "./trick"
import { establishTrick } from "@/lib/establishTrick"

export class Game {
    teams: Team[]
    deck: PlayingCard[]
    players: Player[]
    trick: Trick | null;

    constructor() {
        this.deck = shuffleCards();
        const player1 = new Player({name: 'player 1'});
        const player2 = new Player({name: 'player 2'});
        const player3 = new Player({name: 'player 3'});
        const player4 = new Player({name: 'player 4'});

        this.players = [player1, player2, player3, player4]

        const team1: Team = new Team({
            name: 'team 1',
            players: [player1, player3]
        })

        const team2: Team = new Team({
            name: 'team 2',
            players: [player2, player4]
        })

        this.teams = [team1, team2]

        this.trick = null;
    }

    dealCards() {
        DealCards({cards: this.deck, players: this.players});
    }

    playCard(playerName: string, card: PlayingCard) {
        const player = this.players.find((player) => player.name === playerName);
        if (!player) throw new Error('Player not found when trying to play card')

        player.hand = player.hand.filter((c) => c !== card);
        const cardPlay: CardPlay = {card, player};
        
        if (!this.trick) {
            this.trick = establishTrick(cardPlay);
        }
        if (cardPlay.card.suit !== this.trick.suit) {
            throw new Error(`invalid suit played, catastrophe`)
        }

        this.trick.plays.push(cardPlay);
        if (this.trick.plays.length > 4) {
            throw new Error(`too many card plays!`)
        }
    }
}
import { v4 as uuid } from 'uuid';
import { Card, deck, shuffledDeck } from '../cards';
import { Player, PlayerId } from './player';

declare const GameIdType: unique symbol;

export type GameId = {
  [GameIdType]: typeof GameIdType;
} & string;

export enum PenaltyType {
  DRAW = 'DRAW',
  BLOCK = 'BLOCK',
}

export const createGameId = (): GameId => uuid() as GameId;

export type GameOptions = Pick<Game, 'id' | 'name' | 'players'>;

export class Game {
  id: GameId;
  name: string;
  players: Player[];
  isStarted = false;
  cardsInsideDeck: Card[] = [];
  cardsOnTable: Card[] = [];
  currentCard: Card | null;
  playerTurn: PlayerId | null;
  playerWon: PlayerId | null;
  penalty = 0;
  penaltyType: PenaltyType | null;

  constructor(options: GameOptions) {
    Object.assign(this, options);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  setPlayers(players: Player[]): void {
    this.players = players;
  }

  removePlayer(player: Player): void {
    this.players = this.players.filter((p) => player.id !== p.id);
  }

  updateIsStartedFlag(isStarted: boolean): void {
    this.isStarted = isStarted;
  }

  setCardsInsideDeck(cards: Card[]): void {
    this.cardsInsideDeck = cards;
  }

  getFirstCardFromDeckAndRemove(): Card {
    if (!this.cardsInsideDeck.length) {
      if (this.cardsOnTable.length === 1) {
        this.cardsInsideDeck = shuffledDeck(deck);
      } else {
        this.cardsInsideDeck = shuffledDeck(
          this.cardsOnTable.slice(0, this.cardsOnTable.length - 1)
        );
        this.cardsOnTable = [this.cardsOnTable[this.cardsOnTable.length - 1]];
      }
    }

    const card = this.cardsInsideDeck[0];
    this.cardsInsideDeck = this.cardsInsideDeck.slice(1);

    return card;
  }

  setCardsOnTable(cards: Card[]): void {
    this.cardsOnTable = cards;
  }

  setCurrentCard(card: Card): void {
    this.currentCard = card;
    this.cardsOnTable.push(card);
  }

  setPlayerTurn(playerId: PlayerId): void {
    this.playerTurn = playerId;
  }

  setPlayerWon(playerId: PlayerId): void {
    this.playerWon = playerId;
  }

  setPenalty(penalty: number) {
    this.penalty = penalty;
  }

  setPenaltyType(penaltyType: PenaltyType | null) {
    this.penaltyType = penaltyType;
  }
}

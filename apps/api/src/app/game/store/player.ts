import { v4 as uuid } from 'uuid';
import { Card } from '../cards';

declare const PlayerIdType: unique symbol;

export type PlayerId = {
  [PlayerIdType]: typeof PlayerIdType;
} & string;

export const createPlayerId = (): PlayerId => uuid() as PlayerId;

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  INITIALIZED = 'INITIALIZED',
  CONNECTED = 'CONNECTED',
}

export type PlayerOptions = Pick<Player, 'id' | 'name'>;

export class Player {
  id: PlayerId;
  name: string;
  score = 0;
  connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
  cards: Card[] = [];
  blockedRounds = 0;

  constructor(options: PlayerOptions) {
    Object.assign(this, options);
  }

  updateConnectionStatus(connectionStatus: ConnectionStatus): void {
    this.connectionStatus = connectionStatus;
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  setCards(cards: Card[]): void {
    this.cards = cards;
  }

  removeCard(card: Card): void {
    this.cards = this.cards.filter(
      (c) => !(c.type === card.type && c.value === card.value)
    );
  }

  incrementScore() {
    this.score += 1;
  }

  setBlockedRounds(blockedRounds: number) {
    this.blockedRounds = blockedRounds;
  }
}

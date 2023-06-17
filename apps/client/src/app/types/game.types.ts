export interface GameListItem {
  id: string;
  isStarted: boolean;
  name: string;
  players: { id: string; name: string }[];
}

export enum CardType {
  HEARTS = 'HEARTS',
  CLUBS = 'CLUBS',
  DIAMONDS = 'DIAMONDS',
  SPADES = 'SPADES',
}

export enum CardValue {
  VAL_2 = 'VAL_2',
  VAL_3 = 'VAL_3',
  VAL_4 = 'VAL_4',
  VAL_5 = 'VAL_5',
  VAL_6 = 'VAL_6',
  VAL_7 = 'VAL_7',
  VAL_8 = 'VAL_8',
  VAL_9 = 'VAL_9',
  VAL_10 = 'VAL_10',
  VAL_JACK = 'VAL_JACK',
  VAL_QUEEN = 'VAL_QUEEN',
  VAL_KING = 'VAL_KING',
  VAL_ACE = 'VAL_ACE',
}

export interface Card {
  type: CardType;
  value: CardValue;
  canCounterDrawPenalty: boolean;
  canCounterBlockPenalty: boolean;
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  INITIALIZED = 'INITIALIZED',
  CONNECTED = 'CONNECTED',
}

export enum PenaltyType {
  DRAW = 'DRAW',
  BLOCK = 'BLOCK',
}

export interface Player {
  id: string;
  name: string;
  connectionStatus: ConnectionStatus;
  cards: Card[];
  score: number;
  blockedRounds: number;
}

export interface Game {
  id: string;
  isStarted: boolean;
  name: string;
  players: Player[];
  currentCard?: Card;
  playerTurn: string | null;
  playerWon: string | null;
  penalty: number;
  penaltyType: PenaltyType | null;
}

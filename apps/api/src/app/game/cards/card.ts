import { Game, Player } from '../store';

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

export enum PenaltyType {
  DRAW = 'DRAW',
  BLOCK = 'BLOCK',
}

export type CardOptions = Pick<Card, 'type' | 'value'>;

export abstract class Card {
  type: CardType;
  value: CardValue;
  canCounterDrawPenalty = false;
  canCounterBlockPenalty = false;

  constructor(options: CardOptions) {
    Object.assign(this, options);
  }

  abstract onPlaced(game: Game, placedBy: Player): void;

  canBePlaced(currentCard: Card) {
    if (currentCard.value === CardValue.VAL_QUEEN) return true;

    return currentCard.value === this.value || currentCard.type === this.type;
  }

  getPenaltyCounters(): Record<PenaltyType, boolean> {
    return {
      [PenaltyType.BLOCK]: this.canCounterBlockPenalty,
      [PenaltyType.DRAW]: this.canCounterDrawPenalty,
    };
  }
}

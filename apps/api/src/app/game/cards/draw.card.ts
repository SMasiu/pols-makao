import { Game, PenaltyType } from '../store';
import { Card } from './card';

export type DrawCardOptions = Pick<DrawCard, 'draw' | 'type' | 'value'>;

export class DrawCard extends Card {
  draw: number;
  canCounterDrawPenalty = true;

  constructor({ draw, ...options }: DrawCardOptions) {
    super(options);
    this.draw = draw;
  }

  onPlaced(game: Game) {
    game.setPenaltyType(PenaltyType.DRAW);
    game.setPenalty(game.penalty + this.draw);
  }
}

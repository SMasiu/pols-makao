import { Game, PenaltyType } from '../store';
import { Card } from './card';

export class BlockCard extends Card {
  canCounterBlockPenalty = true;

  onPlaced(game: Game) {
    game.setPenaltyType(PenaltyType.BLOCK);
    game.setPenalty(game.penalty + 1);
  }
}

import { getRandomFromArray } from '../../utils/math.utils';
import { Game } from '../store';
import { Card, CardValue } from './card';
import { deck } from './deck';

export class ColorCard extends Card {
  onPlaced(game: Game) {
    game.currentCard = getRandomFromArray(
      deck.filter((card) => card.value === CardValue.VAL_ACE)
    );
  }
}

import { Card } from './card';

export class QueenCard extends Card {
  onPlaced() {
    return;
  }

  canBePlaced(): boolean {
    return true;
  }
}

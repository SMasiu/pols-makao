import { PlaceCardModel } from '../models';
import { Game, Player } from '../store';

export type PlaceCardCommandResponse = Game;

export class PlaceCardCommand {
  constructor(
    public readonly game: Game,
    public readonly player: Player,
    public readonly card: PlaceCardModel
  ) {}
}

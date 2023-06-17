import { Game, Player } from '../store';

export type DrawCardCommandResponse = Game;

export class DrawCardCommand {
  constructor(public readonly game: Game, public readonly player: Player) {}
}

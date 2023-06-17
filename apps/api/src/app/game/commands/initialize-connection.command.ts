import { Game, Player } from '../store';

export type InitializeConnectionCommandResponse = Game;

export class InitializeConnectionCommand {
  constructor(public readonly game: Game, public readonly player: Player) {}
}

import { Game, Player } from '../store';

export type LeaveFromGameCommandResponse = Game;

export class LeaveFromGameCommand {
  constructor(public readonly game: Game, public readonly player: Player) {}
}

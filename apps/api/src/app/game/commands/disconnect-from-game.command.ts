import { Game, Player } from '../store';

export type DisconnectFromGameCommandResponse = void;

export class DisconnectFromGameCommand {
  constructor(public readonly game: Game, public readonly player: Player) {}
}

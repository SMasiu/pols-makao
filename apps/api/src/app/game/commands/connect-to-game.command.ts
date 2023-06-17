import { Game, Player } from '../store';

export type ConnectToGameCommandResponse = Player;

export class ConnectToGameCommand {
  constructor(public readonly game: Game, public readonly player: Player) {}
}

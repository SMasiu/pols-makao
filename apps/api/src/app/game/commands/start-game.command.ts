import { Game } from '../store';

export type StartGameCommandResponse = Game;

export class StartGameCommand {
  constructor(public readonly game: Game) {}
}

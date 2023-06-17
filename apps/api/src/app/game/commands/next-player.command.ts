import { Game } from '../store';

export type NextPlayerCommandResponse = Game;

export class NextPlayerCommand {
  constructor(public readonly game: Game) {}
}

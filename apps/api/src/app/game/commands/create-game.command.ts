import { CreateGameModel, CreatePlayerModel } from '../models';
import { Game } from '../store';

export type CreateGameCommandResponse = { token: string; game: Game };

export class CreateGameCommand {
  constructor(
    public readonly createGameModel: CreateGameModel,
    public readonly createPlayerModel: CreatePlayerModel
  ) {}
}

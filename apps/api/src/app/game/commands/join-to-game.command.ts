import { CreatePlayerModel } from '../models';
import { Game, GameId } from '../store';

export type JoinToGameCommandResponse = { token: string; game: Game };

export class JoinToGameCommand {
  constructor(
    public readonly gameId: GameId,
    public readonly createPlayerModel: CreatePlayerModel
  ) {}
}

import { Game, GameId } from '../store';

export type GetGameQueryResponse = Game | null;

export class GetGameQuery {
  constructor(public readonly gameId: GameId) {}
}

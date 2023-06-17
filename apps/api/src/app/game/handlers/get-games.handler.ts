import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGamesQuery, GetGamesQueryResponse } from '../queries';
import { GameStore } from '../store';

@QueryHandler(GetGamesQuery)
export class GetGamesHandler implements IQueryHandler<GetGamesQuery> {
  constructor(private readonly gameStore: GameStore) {}

  async execute(): Promise<GetGamesQueryResponse> {
    return this.gameStore.getGames().filter((game) => !game.isStarted);
  }
}

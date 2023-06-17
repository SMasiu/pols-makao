import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGameQuery, GetGameQueryResponse } from '../queries';
import { GameStore } from '../store';

@QueryHandler(GetGameQuery)
export class GetGameHandler implements IQueryHandler<GetGameQuery> {
  constructor(private readonly gameStore: GameStore) {}

  async execute({ gameId }: GetGameQuery): Promise<GetGameQueryResponse> {
    return this.gameStore.getGame(gameId);
  }
}

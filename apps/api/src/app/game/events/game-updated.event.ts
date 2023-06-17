import { GameId } from '../store';

export class GameUpdatedEvent {
  constructor(public readonly gameId: GameId) {}
}

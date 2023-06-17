import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PubSubService } from '../../pub-sub';
import { GamesUpdatedEvent } from '../events';
import { GameEvent } from '../game.events';
import { GameStore } from '../store';

@EventsHandler(GamesUpdatedEvent)
export class GamesUpdatedHandler implements IEventHandler<GamesUpdatedEvent> {
  constructor(
    private readonly gameStore: GameStore,
    private readonly pubSubService: PubSubService
  ) {}

  async handle() {
    const games = this.gameStore.getGames();

    this.pubSubService.gamePubSub.publish(GameEvent.GAMES_CHANGED, {
      onGamesChanges: games,
    });
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PubSubService } from '../../pub-sub';
import { GameUpdatedEvent } from '../events';
import { GameEvent } from '../game.events';
import { GameStore } from '../store';

@EventsHandler(GameUpdatedEvent)
export class GameUpdatedHandler implements IEventHandler<GameUpdatedEvent> {
  constructor(
    private readonly gameStore: GameStore,
    private readonly pubSubService: PubSubService
  ) {}

  async handle({ gameId }: GameUpdatedEvent) {
    const game = this.gameStore.getGame(gameId);

    if (game) {
      this.pubSubService.gamePubSub.publish(GameEvent.GAME_STATE_CHANGED, {
        gameStateChanged: game,
      });
    }
  }
}

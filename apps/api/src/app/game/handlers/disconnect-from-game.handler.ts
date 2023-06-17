import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  DisconnectFromGameCommand,
  DisconnectFromGameCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus, GameStore } from '../store';

@CommandHandler(DisconnectFromGameCommand)
export class DisconnectFromGameHandler
  implements ICommandHandler<DisconnectFromGameCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly gameStore: GameStore
  ) {}

  async execute({
    game,
    player,
  }: DisconnectFromGameCommand): Promise<DisconnectFromGameCommandResponse> {
    player.updateConnectionStatus(ConnectionStatus.DISCONNECTED);

    if (
      game.players.every(
        (player) => player.connectionStatus === ConnectionStatus.DISCONNECTED
      )
    ) {
      this.gameStore.removeGame(game.id);
    }

    this.eventBus.publish(new GameUpdatedEvent(game.id));
  }
}

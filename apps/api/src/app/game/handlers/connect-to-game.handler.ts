import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  ConnectToGameCommand,
  ConnectToGameCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus } from '../store';

@CommandHandler(ConnectToGameCommand)
export class ConnectToGameHandler
  implements ICommandHandler<ConnectToGameCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({
    game,
    player,
  }: ConnectToGameCommand): Promise<ConnectToGameCommandResponse> {
    player.updateConnectionStatus(ConnectionStatus.CONNECTED);

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return player;
  }
}

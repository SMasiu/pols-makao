import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  InitializeConnectionCommand,
  InitializeConnectionCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus } from '../store';

@CommandHandler(InitializeConnectionCommand)
export class InitializeConnectionHandler
  implements ICommandHandler<InitializeConnectionCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({
    game,
    player,
  }: InitializeConnectionCommand): Promise<InitializeConnectionCommandResponse> {
    player.updateConnectionStatus(ConnectionStatus.INITIALIZED);

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return game;
  }
}

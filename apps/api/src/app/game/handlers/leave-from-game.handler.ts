import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  LeaveFromGameCommand,
  LeaveFromGameCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';

@CommandHandler(LeaveFromGameCommand)
export class LeaveFromGameHandler
  implements ICommandHandler<LeaveFromGameCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({
    game,
    player,
  }: LeaveFromGameCommand): Promise<LeaveFromGameCommandResponse> {
    game.removePlayer(player);

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return game;
  }
}

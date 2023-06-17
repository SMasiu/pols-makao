import { BadRequestException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  DrawCardCommand,
  DrawCardCommandResponse,
  NextPlayerCommand,
  NextPlayerCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus } from '../store';

@CommandHandler(DrawCardCommand)
export class DrawCardHandler implements ICommandHandler<DrawCardCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute({
    game,
    player,
  }: DrawCardCommand): Promise<DrawCardCommandResponse> {
    if (!game.isStarted) {
      throw new BadRequestException('Game not started');
    }

    if (game.playerTurn !== player.id) {
      throw new BadRequestException('Not your turn');
    }

    if (
      game.players.some(
        (player) => player.connectionStatus !== ConnectionStatus.CONNECTED
      )
    ) {
      throw new BadRequestException('Not all players are connected');
    }

    player.addCard(game.getFirstCardFromDeckAndRemove());

    await this.commandBus.execute<NextPlayerCommand, NextPlayerCommandResponse>(
      new NextPlayerCommand(game)
    );

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return game;
  }
}

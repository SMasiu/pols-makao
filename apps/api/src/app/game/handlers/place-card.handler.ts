import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import {
  NextPlayerCommand,
  NextPlayerCommandResponse,
  PlaceCardCommand,
  PlaceCardCommandResponse,
} from '../commands';
import { GameUpdatedEvent } from '../events';
import { ConnectionStatus } from '../store';

@CommandHandler(PlaceCardCommand)
export class PlaceCardHandler implements ICommandHandler<PlaceCardCommand> {
  constructor(
    public readonly eventBus: EventBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute({
    game,
    player,
    card,
  }: PlaceCardCommand): Promise<PlaceCardCommandResponse> {
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

    const playerCard = player.cards.find(
      (c) => c.type === card.type && c.value === card.value
    );

    if (!playerCard) {
      throw new NotFoundException('Card not found');
    }

    if (!playerCard.canBePlaced(game.currentCard)) {
      throw new BadRequestException(`You can't place this card`);
    }

    player.removeCard(playerCard);
    game.setCurrentCard(playerCard);
    playerCard.onPlaced(game, player);

    if (!player.cards.length) {
      game.setPlayerWon(player.id);
      game.updateIsStartedFlag(false);
      player.incrementScore();
    } else {
      await this.commandBus.execute<
        NextPlayerCommand,
        NextPlayerCommandResponse
      >(new NextPlayerCommand(game));
    }

    this.eventBus.publish(new GameUpdatedEvent(game.id));

    return game;
  }
}

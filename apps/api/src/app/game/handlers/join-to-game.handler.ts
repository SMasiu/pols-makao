import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '../../jwt';
import { JoinToGameCommand, JoinToGameCommandResponse } from '../commands';
import { GameUpdatedEvent } from '../events';
import { PlayerFactory } from '../factories';
import { GameStore } from '../store';

@CommandHandler(JoinToGameCommand)
export class JoinToGameHandler implements ICommandHandler<JoinToGameCommand> {
  constructor(
    private readonly gameStore: GameStore,
    private readonly playerFactory: PlayerFactory,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService
  ) {}

  async execute({
    gameId,
    createPlayerModel,
  }: JoinToGameCommand): Promise<JoinToGameCommandResponse> {
    const game = this.gameStore.getGame(gameId);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    if (game.isStarted) {
      throw new BadRequestException('Game already started');
    }

    const player = this.playerFactory.create(createPlayerModel);
    game.addPlayer(player);

    const token = await this.jwtService.sign({ playerId: player.id, gameId });

    this.eventBus.publish(new GameUpdatedEvent(gameId));

    return { token, game };
  }
}

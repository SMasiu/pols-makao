import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '../../jwt';
import { CreateGameCommand, CreateGameCommandResponse } from '../commands';
import { GameFactory, PlayerFactory } from '../factories';
import { GameStore } from '../store';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
  constructor(
    private readonly gameFactory: GameFactory,
    private readonly playerFactory: PlayerFactory,
    private readonly gameStore: GameStore,
    private readonly jwtService: JwtService
  ) {}

  async execute({
    createGameModel,
    createPlayerModel,
  }: CreateGameCommand): Promise<CreateGameCommandResponse> {
    const player = this.playerFactory.create(createPlayerModel);
    const game = this.gameFactory.create({
      ...createGameModel,
      players: [player],
    });

    const token = await this.jwtService.sign({
      playerId: player.id,
      gameId: game.id,
    });

    this.gameStore.addGame(game);

    return { token, game };
  }
}

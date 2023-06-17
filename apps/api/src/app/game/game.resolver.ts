import { UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubService } from '../pub-sub';
import { Ctx } from '../types';
import { withCancel } from '../utils';
import {
  ConnectToGameCommand,
  ConnectToGameCommandResponse,
  CreateGameCommand,
  CreateGameCommandResponse,
  DisconnectFromGameCommand,
  DrawCardCommand,
  DrawCardCommandResponse,
  InitializeConnectionCommand,
  JoinToGameCommand,
  JoinToGameCommandResponse,
  PlaceCardCommand,
  PlaceCardCommandResponse,
  StartGameCommand,
  StartGameCommandResponse,
} from './commands';
import { CurrentGame, CurrentPlayer } from './decorators';
import { GameEvent } from './game.events';
import { PlayerGuard } from './guards';
import { GameAuthInterceptor } from './interceptors';
import {
  CreateGameModel,
  GameModel,
  CreatePlayerModel,
  PlayerModel,
  PlaceCardModel,
} from './models';
import {
  GetGameQuery,
  GetGameQueryResponse,
  GetGamesQuery,
  GetGamesQueryResponse,
} from './queries';
import { Game, GameId, Player } from './store';

@Resolver(() => GameModel)
export class GameResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly pubSub: PubSubService
  ) {}

  @Query(() => [GameModel])
  async getGames(): Promise<GetGamesQueryResponse> {
    return this.queryBus.execute<GetGamesQuery, GetGamesQueryResponse>(
      new GetGamesQuery()
    );
  }

  @Query(() => GameModel, { nullable: true })
  @UseGuards(PlayerGuard)
  async getGame(@CurrentGame() game: Game): Promise<GetGameQueryResponse> {
    return this.queryBus.execute<GetGameQuery, GetGameQueryResponse>(
      new GetGameQuery(game.id)
    );
  }

  @Mutation(() => GameModel)
  @UseInterceptors(GameAuthInterceptor)
  async createGame(
    @Args('game', { type: () => CreateGameModel })
    createGameModel: CreateGameModel,
    @Args('player', { type: () => CreatePlayerModel })
    createPlayerModel: CreatePlayerModel
  ): Promise<CreateGameCommandResponse> {
    return this.commandBus.execute<
      CreateGameCommand,
      CreateGameCommandResponse
    >(new CreateGameCommand(createGameModel, createPlayerModel));
  }

  @Mutation(() => GameModel)
  @UseInterceptors(GameAuthInterceptor)
  async joinToGame(
    @Args('gameId', { type: () => String }) gameId: GameId,
    @Args('player', { type: () => CreatePlayerModel })
    createPlayerModel: CreatePlayerModel
  ) {
    return this.commandBus.execute<
      JoinToGameCommand,
      JoinToGameCommandResponse
    >(new JoinToGameCommand(gameId, createPlayerModel));
  }

  @Mutation(() => GameModel)
  @UseGuards(PlayerGuard)
  async startGame(@CurrentGame() game: Game) {
    return this.commandBus.execute<StartGameCommand, StartGameCommandResponse>(
      new StartGameCommand(game)
    );
  }

  @Mutation(() => PlayerModel)
  @UseGuards(PlayerGuard)
  async connectToGame(
    @CurrentGame() game: Game,
    @CurrentPlayer() player: Player
  ) {
    return this.commandBus.execute<
      ConnectToGameCommand,
      ConnectToGameCommandResponse
    >(new ConnectToGameCommand(game, player));
  }

  @Mutation(() => GameModel)
  @UseGuards(PlayerGuard)
  async drawCard(@CurrentGame() game: Game, @CurrentPlayer() player: Player) {
    return this.commandBus.execute<DrawCardCommand, DrawCardCommandResponse>(
      new DrawCardCommand(game, player)
    );
  }

  @Mutation(() => GameModel)
  @UseGuards(PlayerGuard)
  async placeCard(
    @Args('card', { type: () => PlaceCardModel }) card: PlaceCardModel,
    @CurrentGame() game: Game,
    @CurrentPlayer() player: Player
  ) {
    return this.commandBus.execute<PlaceCardCommand, PlaceCardCommandResponse>(
      new PlaceCardCommand(game, player, card)
    );
  }

  @Subscription(() => GameModel, {
    filter: (
      payload: { gameStateChanged: GameModel },
      _: unknown,
      ctx: Ctx
    ) => {
      return payload.gameStateChanged.id === ctx.game.id;
    },
  })
  @UseGuards(PlayerGuard)
  async gameStateChanged(
    @Args('token', { type: () => String }) _: string,
    @CurrentGame() game: Game,
    @CurrentPlayer() player: Player
  ) {
    await this.commandBus.execute(
      new InitializeConnectionCommand(game, player)
    );
    return withCancel(
      this.pubSub.gamePubSub.asyncIterator(GameEvent.GAME_STATE_CHANGED),
      () => {
        this.commandBus.execute(new DisconnectFromGameCommand(game, player));
      }
    );
  }

  @Subscription(() => [GameModel])
  async onGamesChanges() {
    return this.pubSub.gamePubSub.asyncIterator(GameEvent.GAMES_CHANGED);
  }
}

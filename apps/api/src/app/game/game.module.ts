import { Module, Type } from '@nestjs/common';
import {
  CqrsModule,
  ICommandHandler,
  IEventHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { GameFactory, PlayerFactory } from './factories';
import { GameResolver } from './game.resolver';
import {
  ConnectToGameHandler,
  CreateGameHandler,
  DisconnectFromGameHandler,
  GameUpdatedHandler,
  GetGamesHandler,
  JoinToGameHandler,
  StartGameHandler,
  LeaveFromGameHandler,
  InitializeConnectionHandler,
  DrawCardHandler,
  PlaceCardHandler,
  NextPlayerHandler,
  GetGameHandler,
  GamesUpdatedHandler,
} from './handlers';

import { GameStore } from './store';

const queries: Type<IQueryHandler>[] = [GetGamesHandler, GetGameHandler];
const handlers: Type<ICommandHandler>[] = [
  CreateGameHandler,
  JoinToGameHandler,
  StartGameHandler,
  LeaveFromGameHandler,
  ConnectToGameHandler,
  DisconnectFromGameHandler,
  InitializeConnectionHandler,
  DrawCardHandler,
  PlaceCardHandler,
  NextPlayerHandler,
];
const events: Type<IEventHandler>[] = [GameUpdatedHandler, GamesUpdatedHandler];
const factories = [PlayerFactory, GameFactory];

@Module({
  imports: [CqrsModule],
  providers: [
    GameResolver,
    GameStore,
    ...factories,
    ...handlers,
    ...events,
    ...queries,
  ],
})
export class GameModule {}

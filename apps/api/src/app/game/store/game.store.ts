import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { GamesUpdatedEvent } from '../events';
import { Game, GameId } from './game';

@Injectable()
export class GameStore {
  constructor(private readonly eventBus: EventBus) {}

  private games: Game[] = [];

  addGame(game: Game): void {
    this.games.push(game);
    this.eventBus.publish(new GamesUpdatedEvent());
  }

  getGame(id: GameId): Game | null {
    return this.games.find((game) => game.id === id) || null;
  }

  getGames(): Game[] {
    return [...this.games];
  }

  removeGame(id: GameId): void {
    this.games = this.games.filter((game) => game.id !== id);

    this.eventBus.publish(new GamesUpdatedEvent());
  }
}

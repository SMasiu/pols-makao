import { Injectable } from '@nestjs/common';
import { createGameId, Game, GameOptions } from '../store';

@Injectable()
export class GameFactory {
  create(options: Omit<GameOptions, 'id'>): Game {
    return new Game({
      id: createGameId(),
      ...options,
    });
  }
}

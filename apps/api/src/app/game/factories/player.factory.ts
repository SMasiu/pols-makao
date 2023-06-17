import { Injectable } from '@nestjs/common';
import { createPlayerId, Player, PlayerOptions } from '../store';

@Injectable()
export class PlayerFactory {
  create(options: Omit<PlayerOptions, 'id'>): Player {
    return new Player({
      id: createPlayerId(),
      ...options,
    });
  }
}

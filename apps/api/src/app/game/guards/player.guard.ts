import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '../../jwt';
import { Ctx } from '../../types';
import { GameStore } from '../store';

@Injectable()
export class PlayerGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly gameStore: GameStore
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.getArgByIndex<{ token?: string } | null>(1);
    const ctx = context.getArgByIndex<Ctx>(2);

    const token = args?.token || ctx.req?.cookies?.['token'];

    if (!token) {
      return false;
    }

    const { valid, data } = await this.jwtService.verify(token);

    if (!valid) {
      return false;
    }

    const { gameId, playerId } = data;

    const game = this.gameStore.getGame(gameId);

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    const player = game.players.find((player) => player.id === playerId);

    if (!player) {
      throw new NotFoundException('Player not found');
    }

    ctx.game = game;
    ctx.player = player;

    return true;
  }
}

import { Request, Response } from 'express';
import { Game, Player } from '../game';

export interface Ctx {
  req: Request;
  res: Response;
  game: Game;
  player: Player;
}

import { Injectable } from '@nestjs/common';
import { sign, verify, VerifyErrors } from 'jsonwebtoken';
import { GameId, PlayerId } from '../game';

export interface JwtData {
  playerId: PlayerId;
  gameId: GameId;
}

export type JwtVerifyResponse =
  | { valid: false; data: null }
  | { valid: true; data: JwtData };

@Injectable()
export class JwtService {
  private readonly secret = process.env['JWT_SECRET'];

  async sign({ playerId, gameId }: JwtData): Promise<string> {
    return new Promise((resolve, reject) => {
      return sign(
        { playerId, gameId },
        this.secret,
        (err: Error, token: string) => {
          if (err) {
            return reject(err);
          }

          return resolve(token);
        }
      );
    });
  }

  async verify(token: string): Promise<JwtVerifyResponse> {
    return new Promise((resolve) => {
      return verify(
        token,
        this.secret,
        (err: VerifyErrors | null, data: JwtData) => {
          if (err) {
            return resolve({ valid: false, data: null });
          }

          return resolve({ valid: true, data });
        }
      );
    });
  }
}

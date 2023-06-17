import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ctx } from '../../types';
import { Game } from '../store';

@Injectable()
export class GameAuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Game> {
    return next.handle().pipe(
      map((value: { game: Game; token: string }) => {
        context.getArgByIndex<Ctx>(2).res.cookie('token', value.token, {
          expires: new Date(Date.now() + 86_400_000),
        });

        return value.game;
      })
    );
  }
}

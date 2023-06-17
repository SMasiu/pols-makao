import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GameModule } from './game';
import { JwtModule } from './jwt';
import { PubSubModule } from './pub-sub';

@Module({
  imports: [
    CqrsModule,
    GameModule,
    PubSubModule,
    JwtModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (...args) => {
            return {
              req: args[2].request,
              res: args[2].response,
            };
          },
        },
      },
      cors: {
        origin: process.env['CLIENT_URL'],
        credentials: true,
      },
      context: ({ req, res, player, game }) => ({
        req,
        res,
        player,
        game,
      }),
    }),
  ],
})
export class AppModule {}

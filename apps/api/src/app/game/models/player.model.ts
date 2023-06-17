import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ConnectionStatus, PlayerId } from '../store';
import { CardModel } from './card.model';

registerEnumType(ConnectionStatus, { name: 'ConnectionStatus' });

@ObjectType()
export class PlayerModel {
  @Field(() => String)
  id: PlayerId;

  @Field(() => String)
  name: string;

  @Field(() => ConnectionStatus)
  connectionStatus: ConnectionStatus;

  @Field(() => [CardModel])
  cards: CardModel[];

  @Field(() => Int)
  score: number;

  @Field(() => Int)
  blockedRounds: number;
}

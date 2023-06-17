import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CardType, CardValue } from '../cards';

registerEnumType(CardType, { name: 'CardType' });
registerEnumType(CardValue, { name: 'CardValue' });

@ObjectType()
export class CardModel {
  @Field(() => CardType)
  type: CardType;

  @Field(() => CardValue)
  value: CardValue;

  @Field(() => Boolean)
  canCounterDrawPenalty: boolean;

  @Field(() => Boolean)
  canCounterBlockPenalty: boolean;
}

@InputType()
export class PlaceCardModel {
  @Field(() => CardType)
  @IsEnum(CardType)
  type: CardType;

  @Field(() => CardValue)
  @IsEnum(CardValue)
  value: CardValue;
}

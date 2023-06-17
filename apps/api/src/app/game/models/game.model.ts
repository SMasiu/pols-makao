import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GameId, PenaltyType, PlayerId } from '../store';
import { CardModel } from './card.model';
import { PlayerModel } from './player.model';

registerEnumType(PenaltyType, {
  name: 'PenaltyType',
});

@ObjectType()
export class GameModel {
  @Field(() => String)
  id: GameId;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isStarted: boolean;

  @Field(() => [PlayerModel])
  players: PlayerModel;

  @Field(() => String, { nullable: true })
  playerTurn: PlayerId | null;

  @Field(() => String, { nullable: true })
  playerWon: PlayerId | null;

  @Field(() => CardModel, { nullable: true })
  currentCard?: CardModel;

  @Field(() => Int)
  penalty: number;

  @Field(() => PenaltyType, { nullable: true })
  penaltyType: PenaltyType | null;
}

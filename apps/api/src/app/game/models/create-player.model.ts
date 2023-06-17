import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePlayerModel {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;
}

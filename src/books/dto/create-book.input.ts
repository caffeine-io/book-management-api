import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
}

import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @IsInt()
  @Min(0)
  @Field((type) => Int)
  offset: number = 0;

  @IsInt()
  @Min(1)
  @Field((type) => Int)
  limit: number = 10;
}

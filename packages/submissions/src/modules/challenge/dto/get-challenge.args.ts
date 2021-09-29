import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationArgs } from '../../../modules/shared/dto/pagination.args';
import { FilterChallengeInput } from './filter-challenge.input';

@ArgsType()
export class GetChallengeArgs extends PaginationArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterChallengeInput)
  @Field((type) => FilterChallengeInput, { nullable: true })
  filter?: FilterChallengeInput;
}

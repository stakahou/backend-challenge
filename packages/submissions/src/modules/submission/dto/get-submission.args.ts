import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationArgs } from '../../shared/dto/pagination.args';
import { FilterSubmissionInput } from './filter-submission.input';

@ArgsType()
export class GetSubmissionArgs extends PaginationArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterSubmissionInput)
  @Field((type) => FilterSubmissionInput, { nullable: true })
  filter?: FilterSubmissionInput;
}

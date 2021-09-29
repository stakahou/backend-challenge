import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { SubmissionEntity } from '../entities/submission.entity';

@InputType()
export class FilterSubmissionInput extends PartialType(
  PickType(SubmissionEntity, ['challenge', 'status'] as const, InputType),
) {}

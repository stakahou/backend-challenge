import { InputType, PickType } from '@nestjs/graphql';
import { SubmissionEntity } from '../entities/submission.entity';

@InputType()
export class CreateSubmissionInput extends PickType(
  SubmissionEntity,
  ['challenge', 'repository'] as const,
  InputType,
) {}

import { InputType, OmitType } from '@nestjs/graphql';
import { SubmissionEntity } from '../entities/submission.entity';

@InputType()
export class CreateSubmissionInput extends OmitType(
  SubmissionEntity,
  ['id', 'created_at', 'update_at', 'deleted_at'] as const,
  InputType,
) {}

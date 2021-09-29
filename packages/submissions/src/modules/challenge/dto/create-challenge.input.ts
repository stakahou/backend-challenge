import { InputType, OmitType } from '@nestjs/graphql';
import { ChallengeEntity } from '../entities/challenge.entity';

@InputType()
export class CreateChallengeInput extends OmitType(
  ChallengeEntity,
  ['id', 'created_at', 'update_at', 'deleted_at'] as const,
  InputType,
) {}

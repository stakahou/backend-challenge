import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { ChallengeEntity } from '../entities/challenge.entity';

@InputType()
export class FilterChallengeInput extends PartialType(
  PickType(ChallengeEntity, ['description', 'title'] as const, InputType),
) {}

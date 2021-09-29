import { InputType, PartialType } from '@nestjs/graphql';
import { CreateChallengeInput } from './create-challenge.input';

@InputType()
export class UpdateChallengeInput extends PartialType(CreateChallengeInput) {}

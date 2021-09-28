import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSubmissionInput } from './create-submission.input';

@InputType()
export class UpdateSubmissionInput extends PartialType(CreateSubmissionInput) {}

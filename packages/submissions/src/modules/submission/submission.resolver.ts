import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { SubmissionEntity } from './entities/submission.entity';
import { SubmissionService } from './submission.service';

@Resolver((of) => SubmissionEntity)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query((returns) => SubmissionEntity)
  submission() {
    return {};
  }

  @Query((returns) => [SubmissionEntity])
  submissions() {
    return [{}];
  }

  @Mutation((returns) => SubmissionEntity, { nullable: true })
  createSubmission(
    @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput,
  ) {
    this.submissionService.create(createSubmissionInput);
    return null;
  }
}

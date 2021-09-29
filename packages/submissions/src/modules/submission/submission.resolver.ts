import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { GetSubmissionArgs } from './dto/get-submission.args';
import { UpdateSubmissionInput } from './dto/update-submission.input';
import { SubmissionEntity } from './entities/submission.entity';
import { SubmissionService } from './submission.service';

@Resolver((of) => SubmissionEntity)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Mutation((returns) => SubmissionEntity)
  createSubmission(
    @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput,
  ) {
    return this.submissionService.create(createSubmissionInput);
  }

  @Query((returns) => [SubmissionEntity], { name: 'submissions' })
  findAll(@Args() getSubmissionArgs: GetSubmissionArgs) {
    return this.submissionService.findAll(getSubmissionArgs);
  }

  @Query((returns) => SubmissionEntity, { name: 'submission' })
  findOne(@Args('id', ParseUUIDPipe) id: string) {
    return this.submissionService.findOne(id);
  }

  @Mutation((returns) => SubmissionEntity)
  updateSubmission(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('updateSubmissionInput') updateSubmissionInput: UpdateSubmissionInput,
  ) {
    return this.submissionService.update(id, updateSubmissionInput);
  }

  @Mutation((returns) => SubmissionEntity)
  removeSubmission(@Args('id', ParseUUIDPipe) id: string) {
    return this.submissionService.remove(id);
  }
}

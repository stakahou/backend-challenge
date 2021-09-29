import { registerEnumType } from '@nestjs/graphql';
import { SubmissionStatusEnum } from '.';

registerEnumType(SubmissionStatusEnum, {
  name: 'SubmissionStatusEnum',
});

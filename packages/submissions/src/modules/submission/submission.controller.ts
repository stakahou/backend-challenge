import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopicEnum } from '../shared/enums';
import { SubmissionService } from './submission.service';

@Controller()
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @MessagePattern(KafkaTopicEnum.SUBMISSION_RESPONSE)
  submissionConsume(@Payload() message) {
    const { submissionId, grade, status } = message.value;

    this.submissionService.update(submissionId, { grade, status });
  }
}

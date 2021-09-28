import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { KafkaProducerEnum, KafkaTopicEnum } from '../shared/enums';
import { CreateSubmissionInput } from './dto/create-submission.input';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject(KafkaProducerEnum.KAFKA_SUBMISSION_PRODUCER)
    private readonly kafkaProducer: Producer,
  ) {}

  async create(createSubmissionInput: CreateSubmissionInput) {
    await this.kafkaProducer.send({
      topic: KafkaTopicEnum.CHALLENGE_CORRECTION,
      messages: [
        {
          key: 'submissions',
          value: JSON.stringify({}),
        },
      ],
    });
  }
}

import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_CHALLENGE_PRODUCER')
    private readonly kafkaProducer: Producer,
  ) {}

  @MessagePattern('challenge.correction')
  async correctLesson(@Payload() message: CorrectLessonMessage) {
    const { submissionId, repositoryUrl } = message.value;

    await this.kafkaProducer.send({
      topic: 'submission.response',
      messages: [
        {
          key: 'submissions',
          value: JSON.stringify({
            submissionId,
            repositoryUrl,
            grade: Math.floor(Math.random() * 10) + 1,
            status: 'Done',
          }),
        },
      ],
    });
  }
}

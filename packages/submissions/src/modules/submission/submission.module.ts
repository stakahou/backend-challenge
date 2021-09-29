import { Module, Provider } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { ChallengeModule } from '../challenge/challenge.module';
import { KafkaProducerEnum } from '../shared/enums';
import { SubmissionRepository } from './submission.repository';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

const { submission: kafkaSubmissionService } = config.get('kafka_services');

const kafkaProvider: Provider = {
  provide: KafkaProducerEnum.KAFKA_SUBMISSION_PRODUCER,
  useFactory: async (client: ClientKafka) => client.connect(),
  inject: [kafkaSubmissionService.name],
};

@Module({
  imports: [
    ClientsModule.register([kafkaSubmissionService]),
    TypeOrmModule.forFeature([SubmissionRepository]),
    ChallengeModule,
  ],
  providers: [SubmissionResolver, SubmissionService, kafkaProvider],
})
export class SubmissionModule {}

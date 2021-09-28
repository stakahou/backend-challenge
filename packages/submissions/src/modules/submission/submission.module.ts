import { Module, Provider } from '@nestjs/common';
import { ClientKafka, ClientsModule } from '@nestjs/microservices';
import * as config from 'config';
import { KafkaProducerEnum } from '../shared/enums';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

const { submission: kafkaSubmissionService } = config.get('kafka_services');

const kafkaProvider: Provider = {
  provide: KafkaProducerEnum.KAFKA_SUBMISSION_PRODUCER,
  useFactory: async (client: ClientKafka) => client.connect(),
  inject: [kafkaSubmissionService.name],
};

@Module({
  imports: [ClientsModule.register([kafkaSubmissionService])],
  providers: [SubmissionResolver, SubmissionService, kafkaProvider],
})
export class SubmissionModule {}

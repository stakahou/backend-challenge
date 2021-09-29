import { Module, Provider } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

const kafkaProvider: Provider = {
  provide: 'KAFKA_CHALLENGE_PRODUCER',
  useFactory: async (client: ClientKafka) => client.connect(),
  inject: ['KAFKA_CHALLENGE_SERVICE'],
};
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CHALLENGE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [kafkaProvider],
})
export class AppModule {}

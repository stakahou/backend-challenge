import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import graphqlConfig from './configs/graphql.config';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [GraphQLModule.forRoot(graphqlConfig), SubmissionModule],
})
export class AppModule {}

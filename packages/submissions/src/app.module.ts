import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import graphqlConfig from './configs/graphql.config';
import ormConfig from './configs/orm.config';
import { SubmissionModule } from './modules/submission/submission.module';
@Module({
  imports: [
    GraphQLModule.forRoot(graphqlConfig),
    TypeOrmModule.forRoot(ormConfig),
    SubmissionModule,
  ],
})
export class AppModule {}

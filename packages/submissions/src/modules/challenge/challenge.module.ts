import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeRepository } from './challenge.repository';
import { ChallengeResolver } from './challenge.resolver';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeRepository])],
  providers: [ChallengeResolver, ChallengeService],
  exports: [ChallengeService],
})
export class ChallengeModule {}

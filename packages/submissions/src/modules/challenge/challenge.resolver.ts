import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChallengeService } from './challenge.service';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';
import { ChallengeEntity } from './entities/challenge.entity';

@Resolver((of) => ChallengeEntity)
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Mutation((returns) => ChallengeEntity)
  createChallenge(
    @Args('createChallengeInput') createChallengeInput: CreateChallengeInput,
  ) {
    return this.challengeService.create(createChallengeInput);
  }

  @Query((returns) => [ChallengeEntity], { name: 'challenges' })
  findAll() {
    return this.challengeService.findAll();
  }

  @Query((returns) => ChallengeEntity, { name: 'challenge' })
  findOne(@Args('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Mutation((returns) => ChallengeEntity)
  updateChallenge(
    @Args('id') id: string,
    @Args('updateChallengeInput') updateChallengeInput: UpdateChallengeInput,
  ) {
    return this.challengeService.update(id, updateChallengeInput);
  }

  @Mutation((returns) => ChallengeEntity)
  removeChallenge(@Args('id') id: string) {
    return this.challengeService.remove(id);
  }
}

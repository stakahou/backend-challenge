import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeRepository } from './challenge.repository';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  create(createChallengeInput: CreateChallengeInput) {
    const challenge = this.challengeRepository.create(createChallengeInput);
    return this.challengeRepository.save(challenge);
  }

  findAll() {
    return this.challengeRepository.find({ withDeleted: false });
  }

  async findOne(id: string) {
    const found = await this.challengeRepository.findOne(id, {
      withDeleted: false,
    });

    if (!found) throw new NotFoundException();

    return found;
  }

  async update(id: string, updateChallengeInput: UpdateChallengeInput) {
    const challenge = await this.findOne(id);
    Object.assign(challenge, updateChallengeInput);
    return this.challengeRepository.save(challenge);
  }

  async remove(id: string) {
    const challenge = await this.findOne(id);
    await this.challengeRepository.softDelete(challenge);
    return challenge;
  }
}

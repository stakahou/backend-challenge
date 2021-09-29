import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Like } from 'typeorm';
import { ChallengeService } from '../challenge/challenge.service';
import {
  KafkaProducerEnum,
  KafkaTopicEnum,
  SubmissionStatusEnum,
} from '../shared/enums';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { GetSubmissionArgs } from './dto/get-submission.args';
import { UpdateSubmissionInput } from './dto/update-submission.input';
import { SubmissionEntity } from './entities/submission.entity';
import { SubmissionRepository } from './submission.repository';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject(KafkaProducerEnum.KAFKA_SUBMISSION_PRODUCER)
    private readonly kafkaProducer: Producer,
    private readonly submissionRepository: SubmissionRepository,
    private readonly challengeService: ChallengeService,
  ) {}

  private pubSubmission(args) {
    this.kafkaProducer.send({
      topic: KafkaTopicEnum.CHALLENGE_CORRECTION,
      messages: [
        {
          key: 'submissions',
          value: JSON.stringify(args),
        },
      ],
    });
  }

  private async hasErrorInSubmission({
    challenge,
    repository,
  }: CreateSubmissionInput): Promise<HttpException | void> {
    try {
      await this.challengeService.findOne(challenge);
      if (!RegExp('(?:git@|https://)github.com[:/](.*).git').test(repository)) {
        throw new BadRequestException();
      }
    } catch (error) {
      return error;
    }
  }

  async create(createSubmissionInput: CreateSubmissionInput) {
    const error = await this.hasErrorInSubmission(createSubmissionInput);

    const submission = this.submissionRepository.create(createSubmissionInput);

    if (error) submission.status = SubmissionStatusEnum.ERROR;

    const { id: submissionId, repository: repositoryUrl } =
      await this.submissionRepository.save(submission);

    if (error) throw error;

    this.pubSubmission({ submissionId, repositoryUrl });

    return submission;
  }

  findAll({ limit: take, offset: skip, filter = {} }: GetSubmissionArgs) {
    Object.keys(filter).forEach((k) => (filter[k] = Like(`%${filter[k]}%`)));

    return this.submissionRepository.find({
      skip,
      take,
      where: filter,
      withDeleted: false,
    });
  }

  async findOne(id: string) {
    const found = await this.submissionRepository.findOne(id, {
      withDeleted: false,
    });

    if (!found) throw new NotFoundException();

    return found;
  }

  async update(
    id: string,
    updateSubmissionInput: UpdateSubmissionInput | Partial<SubmissionEntity>,
  ) {
    const submission = await this.findOne(id);
    Object.assign(submission, updateSubmissionInput);
    return this.submissionRepository.save(submission);
  }

  async remove(id: string) {
    const submission = await this.findOne(id);
    await this.submissionRepository.softDelete(submission);
    return submission;
  }
}

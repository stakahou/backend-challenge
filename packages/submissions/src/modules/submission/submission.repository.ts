import { EntityRepository, Repository } from 'typeorm';
import { SubmissionEntity } from './entities/submission.entity';

@EntityRepository(SubmissionEntity)
export class SubmissionRepository extends Repository<SubmissionEntity> {}

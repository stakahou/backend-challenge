import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { SubmissionStatusEnum } from 'src/modules/shared/enums';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../modules/shared/entities/base.entity';

@ObjectType()
@Entity({ name: 'submission' })
export class SubmissionEntity extends BaseEntity {
  @IsUUID()
  @Column()
  @Field()
  challenge: string;

  @IsUrl()
  @Column()
  @Field()
  repository: string;

  @IsString()
  @Column({
    type: 'enum',
    enum: SubmissionStatusEnum,
    default: SubmissionStatusEnum.PENDING,
  })
  @Field()
  status: SubmissionStatusEnum;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Column({ nullable: true })
  @Field({ nullable: true })
  grade?: number;
}

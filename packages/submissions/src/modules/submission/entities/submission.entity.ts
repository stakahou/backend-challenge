import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';
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
  @Column()
  @Field()
  status: string;

  @IsNumber()
  @Column()
  @Field()
  grade: number;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../modules/shared/entities/base.entity';

@ObjectType()
@Entity({ name: 'submission' })
export class SubmissionEntity extends BaseEntity {
  @IsUUID()
  @Column()
  @Field((type) => String)
  challenge: string;

  @IsUrl()
  @Column()
  @Field((type) => String)
  repository: string;

  @IsString()
  @Column()
  @Field((type) => String)
  status: string;

  @IsNumber()
  @Column()
  @Field()
  grade: number;
}

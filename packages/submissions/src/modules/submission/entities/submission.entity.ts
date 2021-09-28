import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';
import { BaseEntity } from '../../../modules/shared/entities/base.entity';
// import { Column, Entity } from 'typeorm';

@ObjectType()
// @Entity({ name: 'user' })
export class SubmissionEntity extends BaseEntity {
  @IsUUID()
  // @Column()
  @Field()
  challenge: string;

  @IsUrl()
  // @Column()
  @Field()
  repository: string;

  @IsString()
  // @Column()
  @Field()
  status: string;

  @IsNumber()
  // @Column()
  @Field()
  grade: number;
}

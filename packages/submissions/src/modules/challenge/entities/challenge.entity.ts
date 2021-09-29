import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../modules/shared/entities/base.entity';

@ObjectType()
@Entity({ name: 'challenge' })
export class ChallengeEntity extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  @Field()
  description: string;
}

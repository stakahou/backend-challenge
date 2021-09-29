import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'challenge' })
export class ChallengeEntity extends BaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column()
  @Field((type) => String)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  @Field((type) => String)
  description: string;
}

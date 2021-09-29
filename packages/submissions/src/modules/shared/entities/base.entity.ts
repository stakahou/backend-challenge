import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @IsOptional()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Field({ nullable: true })
  id?: string;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  update_at: Date;

  @DeleteDateColumn()
  @Field((type) => Date)
  deleted_at: Date;
}

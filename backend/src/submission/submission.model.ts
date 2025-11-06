import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export type SubmissionDocument = Submission & Document;

@Schema()
export class Submission {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  doi: string;

  @Prop({ required: true })
  submitterEmail: string;

  @Prop({ default: Date.now })
  submittedAt: Date;

  @Prop({ default: SubmissionStatus.PENDING, enum: SubmissionStatus })
  status: SubmissionStatus;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

export class CreateSubmissionDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'DOI不能为空' })
  @IsString()
  doi: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式错误' })
  submitterEmail: string;
}
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission, SubmissionDocument, CreateSubmissionDto, SubmissionStatus } from './submission.model';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto): Promise<Submission> {
    const existing = await this.submissionModel.findOne({ doi: createSubmissionDto.doi }).exec();
    if (existing) {
      throw new ConflictException('DOI已存在');
    }
    const newSub = new this.submissionModel(createSubmissionDto);
    return newSub.save();
  }

  async findPending(): Promise<Submission[]> {
    return this.submissionModel.find({ status: SubmissionStatus.PENDING })
      .sort({ submittedAt: -1 })
      .exec();
  }
}
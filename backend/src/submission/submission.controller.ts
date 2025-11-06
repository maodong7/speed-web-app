import { Controller, Post, Get, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, Submission } from './submission.model';

@Controller('api/submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    try {
      const submission = await this.submissionService.create(createSubmissionDto);
      return {
        success: true,
        message: '提交成功',
        data: submission
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  @Get('pending')
  async findPending() {
    const pending = await this.submissionService.findPending();
    return {
      success: true,
      message: '查询成功',
      data: pending
    };
  }
}
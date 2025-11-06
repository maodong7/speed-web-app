import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // 新增导入
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Submission, SubmissionSchema } from './submission.model'; // 导入模型和Schema

@Module({
  imports: [
    // 注册Mongoose模型到当前模块
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }])
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService]
})
export class SubmissionModule {}
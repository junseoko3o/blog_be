import { Module } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { RecommentController } from './recomment.controller';
import { UserModule } from 'src/user/user.module';
import { ContentModule } from 'src/content/content.module';
import { CommentModule } from 'src/comment/comment.module';
import { ReCommentRepository } from './recomment.repository';

@Module({
  imports: [
    UserModule,
    ContentModule,
    CommentModule,
  ],
  controllers: [RecommentController],
  providers: [
    RecommentService,
    ReCommentRepository,
  ],
})
export class RecommentModule {}

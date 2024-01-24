import { Injectable } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { UserService } from 'src/user/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from 'src/comment/comment.service';
import { RecommentRepository } from './recomment.repository';

@Injectable()
export class RecommentService {
  constructor(
    private readonly recommentRepository: RecommentRepository,
    private readonly userService: UserService,
    private readonly contentService: ContentService,
    private readonly commentService: CommentService,
  ) {}

  async findAllReCommentInComment(comment_id: number) {
    return await this.recommentRepository.findAllRecommentInComment(comment_id);
  }

  async findOneReCommentInComment(id: number, comment_id: number) {
    return await this.recommentRepository.findOneReCommentInComment(id, comment_id)
  }
}

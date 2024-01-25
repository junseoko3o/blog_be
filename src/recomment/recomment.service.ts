import { Injectable } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { UserService } from 'src/user/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from 'src/comment/comment.service';
import { RecommentRepository } from './recomment.repository';
import { Recomment } from './recomment.entity';

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

  async createRecomment(createData: CreateRecommentDto) {
    const user = await this.userService.findOneUser(createData.created_user_id);
    const content = await this.contentService.findOneContent(createData.content_id);
    const comment = await this.commentService.findOneComment(createData.comment_id);

    const reComment = new Recomment();
    reComment.recomment = createData.recomment;
    reComment.content_id = content.id;
    reComment.comment_id = comment.id;
    reComment.user_name = user.user_name;
    reComment.created_user_id = user.id;

    return await this.recommentRepository.createRecomment(reComment);
  }
}

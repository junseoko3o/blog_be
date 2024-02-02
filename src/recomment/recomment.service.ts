import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { UserService } from 'src/user/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from 'src/comment/comment.service';
import { RecommentRepository } from './recomment.repository';
import { Recomment } from './recomment.entity';
import { LikeRecommentDto } from './dto/like-recomment.dto';

@Injectable()
export class RecommentService {
  constructor(
    private readonly recommentRepository: RecommentRepository,
    private readonly userService: UserService,
    private readonly contentService: ContentService,
    private readonly commentService: CommentService,
  ) {}

  async findOneRecomment(id: number) {
    const recomment = await this.recommentRepository.findOneRecomment(id);
    if (!recomment) {
      throw new NotFoundException('not found recomment');
    }
    return recomment;
  }

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

  async updateRecomment(id: number, updateData: UpdateRecommentDto) {
    const user = await this.userService.findOneUser(updateData.updated_user_id);
    const recomment = await this.recommentRepository.findOneRecomment(id);
    if (updateData.user_id !== recomment.created_user_id) {
      throw new BadRequestException('is not your recommnet.');
    }
    recomment.updated_user_id = user.id;
    recomment.recomment = updateData.recomment;
    return await this.recommentRepository.updateRecomment(id, updateData);
  }

  async deleteRecomment(id: number, user_id: number) {
    const recomment = await this.findOneRecomment(id);
    if (!user_id) {
      throw new BadRequestException('user_id should be contained.');
    }
    if (recomment.created_user_id !== user_id) {
      throw new BadRequestException('is not your recomment.');
    }
    await this.recommentRepository.deleteRecomment(id);
    return 'delete success';
  }
  
  async likeUpdateRecomment(id: number, likeData: LikeRecommentDto) {
    const recomment = await this.recommentRepository.findOneRecomment(id);
    if(likeData.heart === true) {
      recomment.like += recomment.like;
    } else {
      recomment.like -= recomment.like;
    }
    return await this.recommentRepository.updateLiketRecomment(id, likeData);
  }
}

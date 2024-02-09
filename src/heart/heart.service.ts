import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { Repository } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { RecommentService } from 'src/recomment/recomment.service';
import { CommentHeartDto } from './dto/comment-heart.dto';
import { ReCommentHeartDto } from './dto/recomment-heart.dto';

@Injectable()
export class HeartService {
  constructor(
    @InjectRepository(Heart)
    private readonly heartRepository: Repository<Heart>,
    private readonly commentService: CommentService,
    private readonly recommentService: RecommentService,
  ) {}

  async findAllHeart() {
    return await this.heartRepository.find();
  }

  async findOneHeartInComment(comment_id: number) {
    return await this.heartRepository.findOne({
      where: { comment_id },
    });
  }

  async findOneHeartInRecomment(recomment_id: number) {
    return await this.heartRepository.findOne({
      where: { recomment_id },
    });
  }

  async createCommentLike(commentHeartDto: CommentHeartDto) {
    await this.commentService.findOneComment(commentHeartDto.comment_id);
    const heart = new Heart();
    heart.comment_id = commentHeartDto.comment_id;
    heart.like = 0;

    return await this.heartRepository.save(heart);
  }

  async createReCommentLike(recommentHeartDto: ReCommentHeartDto) {
    await this.commentService.findOneComment(recommentHeartDto.recomment_id);
    const heart = new Heart();
    heart.comment_id = recommentHeartDto.recomment_id;
    heart.like = 0;

    return await this.heartRepository.save(heart);
  }
}

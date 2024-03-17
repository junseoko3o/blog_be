import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { Repository } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { RecommentService } from 'src/recomment/recomment.service';
import { CommentHeartDto } from './dto/comment-heart.dto';
import { UpdateCommentHeartDto } from './dto/update.comment-heart.dto';
import { RecommentHeartDto } from './dto/recomment-heart.dto';
import { UpdateRecommentHeartDto } from './dto/update.recomment-heart.dto';
import { CommentHeartInfoDto } from './dto/comment-heart-info.dto';

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

  async findAllHeartInComment(comment_id: number) {
    return await this.heartRepository.find({
      where: { comment_id },
    });
  }

  async findAllHeartInRecomment(recomment_id: number) {
    return await this.heartRepository.find({
      where: { recomment_id },
    });
  }

  async findOneHeartInComment(comment_id: number) {
    await this.commentService.findOneComment(comment_id);
    return await this.heartRepository.findOne({
      where: { comment_id },
    });
  }

  async findOneHeartInRecomment(recomment_id: number) {
    await this.recommentService.findOneRecomment(recomment_id);
    return await this.heartRepository.findOne({
      where: { recomment_id },
    });
  }

  async likeCountInComment(comment_id: number) {
    const heart = await this.heartRepository.find({
      where: { comment_id },
    });
    let count = 0;
    for (let i = 0; i < heart.length; i++) {
        if (heart[i].like === true) {
            count++;
        }
    }
    return {
      like_count: count,
      comment_id,
    };
  }

  async heartInfoInComment(commentHeartInfoDto: CommentHeartInfoDto) {
    const findHeart = await this.heartRepository.findOne({
      where: { 
        comment_id: commentHeartInfoDto.comment_id,
        user_id: commentHeartInfoDto.user_id,
      }
    });
    return findHeart;
  }

  async createCommentLike(commentHeartDto: CommentHeartDto) {
    const commentHeartInfoDto: CommentHeartInfoDto = {
      comment_id: commentHeartDto.comment_id,
      user_id: commentHeartDto.user_id,
    };
    const findHeart = await this.heartInfoInComment(commentHeartInfoDto);
    if (findHeart) {
      return await this.updateCommentLike({
        comment_id: commentHeartDto.comment_id,
        like: commentHeartDto.like,
      });
    } else {
      const heart = new Heart();
      heart.comment_id = commentHeartDto.comment_id;
      heart.like = commentHeartDto.like;
      return await this.heartRepository.save(heart);
    }
  }

  async updateCommentLike(commentHeartDto: UpdateCommentHeartDto) {
    await this.commentService.findOneComment(commentHeartDto.comment_id);
    const heart = await this.findOneHeartInComment(commentHeartDto.comment_id);
    heart.comment_id = commentHeartDto.comment_id;
    heart.like = commentHeartDto.like;
    await this.heartRepository.update(heart.id, heart);
    return heart;
  }

  async createRecommentLike(recommentHeartDto: RecommentHeartDto) {
    const findHeart = await this.heartRepository.findOne({
      where: { recomment_id: recommentHeartDto.recomment_id }
    });
    if (findHeart && findHeart.like === true) {
      throw new BadRequestException();
    }
    const heart = new Heart();
    heart.recomment_id = recommentHeartDto.recomment_id;
    heart.like = true;
    return await this.heartRepository.save(heart);
  }

  async updateRecommentLike(recommentHeartDto: UpdateRecommentHeartDto) {
    await this.recommentService.findOneRecomment(recommentHeartDto.recomment_id);
    const heart = await this.findOneHeartInRecomment(recommentHeartDto.recomment_id);
    if (heart.like === false) {
      throw new BadRequestException();
    }
    heart.recomment_id = recommentHeartDto.recomment_id;
    heart.like = false;
    await this.heartRepository.update(heart.id, heart);
    return heart;
  }
}

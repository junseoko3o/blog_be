import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { Repository } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { RecommentService } from 'src/recomment/recomment.service';
import { CommentHeartDto } from './dto/comment-heart.dto';
import { ReCommentHeartDto } from './dto/recomment-heart.dto';
import { UpdateCommentHeartDto } from './dto/update.comment-heart.dto';
import { UpdateReCommentHeartDto } from './dto/update.recomment-heart.dto';

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

  // async findOneHeartInUser(user_id: number) {
  //   return await this.heartRepository.findOne({
  //     where: { user_id },
  //   })
  // }

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

  // async likeCountInComment(comment_id: number) {
  //   const heart = await this.heartRepository.find({
  //     where: { comment_id },
  //   });
  //   let count = 0;
  //   for (let i = 0; i < heart.length; i++) {
  //       if (heart[i].like === true) {
  //           count++;
  //       }
  //   }
  //   return {
  //     like_count: count,
  //   };
  // }

  // async createCommentLike(commentHeartDto: CommentHeartDto) {
  //   const heart = await this.heartRepository.findOne({
  //     where: { comment_id }
  //   });
  //   if (heart && heart.like === true) {
  //     throw new BadRequestException();
  //   }
  //   const heart = new Heart();
  //   heart.comment_id = commentHeartDto.comment_id;
  //   heart.like = true;
  //   return await this.heartRepository.save(heart);
  // }

  // async updateCommentLike(commentHeartDto: UpdateCommentHeartDto) {
  //   await this.commentService.findOneComment(commentHeartDto.comment_id);
  //   const heart = await this.findOneHeartInComment(commentHeartDto.comment_id);
  //   if (heart.like === false) {
  //     throw new BadRequestException();
  //   }
  //   heart.comment_id = commentHeartDto.comment_id;
  //   heart.like = false;
  //   await this.heartRepository.update(heart.id, heart);
  //   return heart;
  // }

      // async createRecommentLike(recommentHeartDto: RecommentHeartDto) {
  //   const heart = await this.heartRepository.findOne({
  //     where: { recomment_id }
  //   });
  //   if (heart && heart.like === true) {
  //     throw new BadRequestException();
  //   }
  //   const heart = new Heart();
  //   heart.recomment_id = commentHeartDto.recomment_id;
  //   heart.like = true;
  //   return await this.heartRepository.save(heart);
  // }

  // async updateRecommentLike(recommentHeartDto: UpdateRecommentHeartDto) {
  //   await this.recommentService.findOneRecomment(commentHeartDto.recomment_id);
  //   const heart = await this.findOneHeartInRecomment(recommentHeartDto.recomment_id);
  //   if (heart.like === false) {
  //     throw new BadRequestException();
  //   }
  //   heart.recomment_id = recommentHeartDto.recomment_id;
  //   heart.like = false;
  //   await this.heartRepository.update(heart.id, heart);
  //   return heart;
  // }

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
    // heart.user_id = recommentHeartDto.user_id;
    heart.like = 0;

    return await this.heartRepository.save(heart);
  }

  async updateCommentLike(commentHeartDto: UpdateCommentHeartDto) {
    await this.commentService.findOneComment(commentHeartDto.comment_id);
    const heart = await this.findOneHeartInComment(commentHeartDto.comment_id);
    heart.comment_id = commentHeartDto.comment_id;
    if (commentHeartDto.like === true) {
      heart.like++;
    } else {
      heart.like = Math.max(0, heart.like - 1);
    }
    await this.heartRepository.update(heart.id, heart);
    return heart;
  }

  async updateReommentLike(recommentHeartDto: UpdateReCommentHeartDto) {
    await this.commentService.findOneComment(recommentHeartDto.recomment_id);
    const heart = await this.findOneHeartInRecomment(recommentHeartDto.recomment_id);
    heart.recomment_id = recommentHeartDto.recomment_id;
    if (recommentHeartDto.like === true) {
      heart.like++;
    } else {
      heart.like = Math.max(0, heart.like - 1);
    }
    await this.heartRepository.update(heart.id, heart);
    return heart;
  }
}

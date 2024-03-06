import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { HeartService } from './heart.service';
import { CommentHeartDto } from './dto/comment-heart.dto';
import { UpdateCommentHeartDto } from './dto/update.comment-heart.dto';
import { RecommentHeartDto } from './dto/recomment-heart.dto';
import { UpdateRecommentHeartDto } from './dto/update.recomment-heart.dto';
import { CommentHeartInfoDto } from './dto/comment-heart-info.dto';

@Controller('heart')
export class HeartController {
  constructor(private readonly heartService: HeartService) {}

  @Get('/comment/list')
  async findAllHeartInComment(@Param('comment_id') comment_id: number) {
    return await this.heartService.findAllHeartInComment(comment_id);
  }

  @Get('/comment/:comment_id')
  async likeCountInComment(@Param('comment_id') comment_id: number) {
    return await this.heartService.likeCountInComment(comment_id);
  }

  @Get('/info/:comment_id')
  async heartInfoComment(@Param('comment_id') comment_id: number, @Query('user') user_id: number) {
    const commentHeartInfoDto: CommentHeartInfoDto = {
      comment_id,
      user_id,
    }
    return await this.heartService.heartInfoInComment(commentHeartInfoDto);
  }

  @Post('/comment/info')
  async heartInfoInComment(@Body() commentHeartInfoDto: CommentHeartInfoDto) {
    return await this.heartService.heartInfoInComment(commentHeartInfoDto);
  }

  @Post('/recomment')
  async createHeartInReComment(@Body() recommentHeartDto: RecommentHeartDto) {
    return await this.heartService.createRecommentLike(recommentHeartDto);
  }

  @Post('/comment')
  async createHeartInComment(@Body() createHeartDto: CommentHeartDto) {
    return await this.heartService.createCommentLike(createHeartDto);
  }

  @Post('/comment/update')
  async updateHeartInComment(@Body() commentHeartDto: UpdateCommentHeartDto) {
    return await this.heartService.updateCommentLike(commentHeartDto);
  }

  @Post('/recomment/update')
  async updateHeartInReComment(@Body() recommentHeartDto: UpdateRecommentHeartDto) {
    return await this.heartService.updateRecommentLike(recommentHeartDto);
  }
}

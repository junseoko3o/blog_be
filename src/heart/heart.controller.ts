import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeartService } from './heart.service';

@Controller('heart')
export class HeartController {
  constructor(private readonly heartService: HeartService) {}

  @Get('/comment/:comment_id')
  async findOneHeartInComment(@Param('comment_id') comment_id: number) {
    return await this.heartService.findOneHeartInComment(comment_id);
  }

  @Get('/recomment/:recomment_id')
  async findOneHeartInRecomment(@Param('recomment_id') recomment_id: number) {
    return await this.heartService.findOneHeartInRecomment(recomment_id);
  }
}

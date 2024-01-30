import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { LikeRecommentDto } from './dto/like-recomment.dto';

@Controller('recomment')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Get('/:comment_id')
  async findAllRecommentInComment(@Param('comment_id') comment_id: number) {
    return await this.recommentService.findAllReCommentInComment(comment_id);
  }

  @Post('/:id')
  async findOneRecommentInComment(@Param('id') id: number, @Body() comment_id: number) {
    return await this.recommentService.findOneReCommentInComment(id, comment_id);
  }

  @Post()
  async createRecomment(@Body() createData: CreateRecommentDto) {
    return await this.recommentService.createRecomment(createData);
  }

  @Post('/update/:id')
  async updateRecomment(@Param('id') id: number, @Body() updateData: UpdateRecommentDto) {
    return await this.recommentService.updateRecomment(id, updateData);
  }

  @Delete('/:id')
  async deleteRecomment(@Param('id') id: number, @Body() user_id: number) {
    return await this.recommentService.deleteRecomment(id, user_id);
  }

  @Post('/like/:id')
  async likeUpdateRecomment(@Param('id') id: number, @Body() likeData: LikeRecommentDto) {
    return await this.recommentService.likeUpdateRecomment(id, likeData);
  }
}

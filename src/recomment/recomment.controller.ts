import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';

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
}

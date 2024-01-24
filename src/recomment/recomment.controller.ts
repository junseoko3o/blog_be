import { Controller, Get, Param } from '@nestjs/common';
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
}

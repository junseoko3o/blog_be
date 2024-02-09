import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { Repository } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { RecommentService } from 'src/recomment/recomment.service';
import { CommentHeartDto } from './dto/comment-heart.dto';

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
}

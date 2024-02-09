import { Injectable } from '@nestjs/common';
import { CreateHeartDto } from './dto/create-heart.dto';
import { UpdateHeartDto } from './dto/update-heart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from './heart.entity';
import { Repository } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { RecommentService } from 'src/recomment/recomment.service';

@Injectable()
export class HeartService {
  constructor(
    @InjectRepository(Heart)
    private readonly heartRepository: Repository<Heart>,
    private readonly commentService: CommentService,
    private readonly recommentService: RecommentService,
  ) {}
}

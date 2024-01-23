import { Injectable } from '@nestjs/common';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';
import { UserService } from 'src/user/user.service';
import { ContentService } from 'src/content/content.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class RecommentService {
  constructor(
    private readonly userService: UserService,
    private readonly contentService: ContentService,
    private readonly commentService: CommentService,
  ) {}
}

import { Controller } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';

@Controller('recomment')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}
}

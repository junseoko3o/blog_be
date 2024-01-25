import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommentDto } from './create-recomment.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRecommentDto extends PartialType(CreateRecommentDto) {
  @IsString()
  recomment: string;

  @IsNumber()
  content_id: number;

  @IsNumber()
  comment_id: number;

  @IsNumber()
  updated_user_id: number;
}

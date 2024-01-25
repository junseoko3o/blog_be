import { IsNumber, IsString } from "class-validator";

export class CreateRecommentDto {
  @IsString()
  recomment: string;

  @IsNumber()
  content_id: number;

  @IsNumber()
  comment_id: number;

  @IsNumber()
  created_user_id: number;
}

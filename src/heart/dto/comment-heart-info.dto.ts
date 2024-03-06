import { IsBoolean, IsNumber } from "class-validator";

export class CommentHeartInfoDto {
  @IsNumber()
  comment_id: number;

  @IsNumber()
  user_id: number;
}
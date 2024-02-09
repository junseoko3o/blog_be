import { IsBoolean, IsNumber } from "class-validator";

export class UpdateCommentHeartDto {
  @IsNumber()
  comment_id: number;

  @IsBoolean()
  like: boolean;
}
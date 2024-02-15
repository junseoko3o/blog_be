import { IsBoolean, IsNumber } from "class-validator";

export class CommentHeartDto {
  @IsNumber()
  comment_id: number;

  // @IsBoolean()
  // like: boolean;

  // @IsNumber()
  // user_id: number;
}
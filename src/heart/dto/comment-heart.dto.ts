import { IsNumber, IsOptional } from "class-validator";

export class CommentHeartDto {
  @IsNumber()
  comment_id: number;

  @IsNumber()
  @IsOptional()
  like: number;
}
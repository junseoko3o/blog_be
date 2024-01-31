import { IsNumber, IsOptional } from "class-validator";

export class LikeCommentDto {
  @IsNumber()
  @IsOptional()
  like: number;

  @IsNumber()
  @IsOptional()
  disLike: number;
}
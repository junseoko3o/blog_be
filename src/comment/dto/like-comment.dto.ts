import { IsBoolean, IsOptional } from "class-validator";

export class LikeCommentDto {
  @IsBoolean()
  heart: boolean;

  @IsOptional()
  like: number;
}
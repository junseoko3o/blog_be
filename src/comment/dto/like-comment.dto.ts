import { IsBoolean, IsOptional } from "class-validator";

export class LikeCommentDto {
  @IsBoolean()
  @IsOptional()
  heart: boolean;
}
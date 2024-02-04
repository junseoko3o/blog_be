import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class LikeCommentDto {
  @IsBoolean()
  heart: boolean;

  @IsOptional()
  @IsNumber()
  like: number;
}
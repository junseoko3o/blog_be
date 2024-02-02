import { IsBoolean, IsOptional } from "class-validator";

export class LikeRecommentDto {
  @IsBoolean()
  heart: boolean;

  @IsOptional()
  like: number;
}
import { IsBoolean, IsOptional } from "class-validator";

export class LikeRecommentDto {
  @IsBoolean()
  @IsOptional()
  heart: boolean;
}
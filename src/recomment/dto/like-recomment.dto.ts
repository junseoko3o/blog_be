import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class LikeRecommentDto {
  @IsBoolean()
  heart: boolean;

  @IsOptional()
  @IsNumber()
  like: number;
}
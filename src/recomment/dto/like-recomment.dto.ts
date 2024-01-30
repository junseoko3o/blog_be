import { IsNumber, IsOptional } from "class-validator";

export class LikeRecommentDto {
  @IsNumber()
  @IsOptional()
  like: number;

  @IsNumber()
  @IsOptional()
  disLike: number;
}
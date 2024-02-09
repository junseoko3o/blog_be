import { IsNumber, IsOptional } from "class-validator";

export class ReCommentHeartDto {
  @IsNumber()
  recomment_id: number;

  @IsNumber()
  @IsOptional()
  like: number;
}
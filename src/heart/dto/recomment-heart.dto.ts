import { IsNumber } from "class-validator";

export class ReCommentHeartDto {
  @IsNumber()
  recomment_id: number;

  @IsNumber()
  like: number;
}
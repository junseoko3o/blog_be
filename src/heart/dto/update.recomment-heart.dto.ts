import { IsBoolean, IsNumber } from "class-validator";

export class UpdateReCommentHeartDto {
  @IsNumber()
  recomment_id: number;

  @IsBoolean()
  like: boolean;
}
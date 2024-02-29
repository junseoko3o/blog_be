import { IsBoolean, IsNumber } from "class-validator";

export class UpdateRecommentHeartDto {
  @IsNumber()
  recomment_id: number;

  @IsBoolean()
  like: boolean;
}
import { IsNumber } from "class-validator";

export class RecommentHeartDto {
  @IsNumber()
  recomment_id: number;
  
  @IsNumber()
  user_id: number;
}
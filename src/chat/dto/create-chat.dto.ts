import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
  @IsString()
  message: string;

  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  room: string;
}

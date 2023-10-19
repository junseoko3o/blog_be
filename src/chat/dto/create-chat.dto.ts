import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
  @IsString()
  message: string;

  @IsNumber()
  userId: number;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  room: string;
}

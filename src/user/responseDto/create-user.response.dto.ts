import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class UserResponseDto {
  @IsNumber()
  id: number;

  @IsEmail()
  user_email: string;

  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsDate()
  login_at: Date;

  @IsDate()
  created_at: Date;

  updated_at: Date;
}

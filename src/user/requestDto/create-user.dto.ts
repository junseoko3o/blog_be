import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  user_email: string;

  @IsString()
  user_name: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  @MinLength(10)
  @MaxLength(20)
  password: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  user_name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsDate()
  login_at: Date;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  @IsEmail()
  email: string;
}

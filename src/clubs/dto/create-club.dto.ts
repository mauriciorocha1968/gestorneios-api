import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClubDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

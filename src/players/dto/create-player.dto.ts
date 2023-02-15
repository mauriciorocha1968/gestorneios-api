import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  apelido: string;

  @IsString()
  nameMemorando: string;
}

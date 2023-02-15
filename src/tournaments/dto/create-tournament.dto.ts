import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  tableName: string;

  @IsString()
  @IsNotEmpty()
  tableInformation: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  by: string;

  @IsDateString()
  @IsNotEmpty()
  dateUTC: string;

  @IsString()
  @IsNotEmpty()
  _idPeriod: string;

  @IsString()
  @IsNotEmpty()
  _idSuperUnion: string;

  @IsString()
  @IsNotEmpty()
  _idLeague: string;

  @IsString()
  @IsNotEmpty()
  _idClub: string;

  @IsString()
  @IsNotEmpty()
  nomeClub: string;

  @IsString()
  @IsNotEmpty()
  _idPlayer: string;

  @IsString()
  playerApelido: string;

  @IsString()
  playerNameMemorando: string;

  @IsNumber()
  buyInFichas: number;

  @IsNumber()
  taxa: number;

  @IsNumber()
  resultado: number;
}

import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePeriodDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsDateString()
  @IsNotEmpty()
  dateInitial: string;

  @IsDateString()
  @IsNotEmpty()
  dateFinish: string;
}

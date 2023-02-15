import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImportDto {
  @IsNumber()
  rowIndex: number;

  @IsNotEmpty()
  dateInitial: string;

  @IsNotEmpty()
  dateFinish: string;

  @IsNotEmpty()
  nameSheet: string;

  @IsArray()
  dataSheet: [];

  @IsNumber()
  registers: number;
}

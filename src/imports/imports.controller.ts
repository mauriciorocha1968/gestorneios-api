import { Body, Controller, Post } from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { ImportsService } from './imports.service';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Post('jogos-ppst-utc-0300')
  importJogosPPSR(@Body() createImportDto: CreateImportDto) {
    return this.importsService.ImportJogosPPSR(createImportDto);
  }
}

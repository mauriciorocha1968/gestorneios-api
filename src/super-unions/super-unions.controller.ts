import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSuperUnionDto } from './dto/create-super-union.dto';
import { UpdateSuperUnionDto } from './dto/update-super-union.dto';
import { SuperUnionsService } from './super-unions.service';

@Controller('super-unions')
export class SuperUnionsController {
  constructor(private readonly superUnionsService: SuperUnionsService) {}

  @Post()
  create(@Body() createSuperUnionDto: CreateSuperUnionDto) {
    return this.superUnionsService.create(createSuperUnionDto);
  }

  @Get()
  findAll() {
    return this.superUnionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superUnionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSuperUnionDto: UpdateSuperUnionDto,
  ) {
    return this.superUnionsService.update(id, updateSuperUnionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superUnionsService.remove(id);
  }
}

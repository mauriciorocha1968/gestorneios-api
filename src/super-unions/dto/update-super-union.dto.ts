import { PartialType } from '@nestjs/mapped-types';
import { CreateSuperUnionDto } from './create-super-union.dto';

export class UpdateSuperUnionDto extends PartialType(CreateSuperUnionDto) {}

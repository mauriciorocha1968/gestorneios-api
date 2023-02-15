import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperUnionSchema } from './entities/super-union.entity';
import { SuperUnionsController } from './super-unions.controller';
import { SuperUnionsService } from './super-unions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SuperUnion', schema: SuperUnionSchema },
    ]),
  ],
  controllers: [SuperUnionsController],
  providers: [SuperUnionsService],
  exports: [SuperUnionsService],
})
export class SuperUnionsModule {}

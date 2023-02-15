import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { ClubSchema } from './entities/club.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Club', schema: ClubSchema }])],
  controllers: [ClubsController],
  providers: [ClubsService],
  exports: [ClubsService],
})
export class ClubsModule {}

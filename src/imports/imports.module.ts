import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubsModule } from 'src/clubs/clubs.module';
import { LeaguesModule } from 'src/leagues/leagues.module';
import { PeriodsModule } from 'src/periods/periods.module';
import { PlayersModule } from 'src/players/players.module';
import { SuperUnionsModule } from 'src/super-unions/super-unions.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { ImportSchema } from './entities/import.entity';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Import', schema: ImportSchema }]),
    ClubsModule,
    PlayersModule,
    LeaguesModule,
    PeriodsModule,
    SuperUnionsModule,
    TournamentsModule,
  ],
  controllers: [ImportsController],
  providers: [ImportsService],
  exports: [ImportsService],
})
export class ImportsModule {}

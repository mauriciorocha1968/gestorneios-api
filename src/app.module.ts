import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SuperUnionsModule } from './super-unions/super-unions.module';
import { LeaguesModule } from './leagues/leagues.module';
import { ClubsModule } from './clubs/clubs.module';
import { PeriodsModule } from './periods/periods.module';
import { PlayersModule } from './players/players.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: 'evo-gestao-torneios',
    }),
    UsersModule,
    SuperUnionsModule,
    LeaguesModule,
    ClubsModule,
    PeriodsModule,
    PlayersModule,
    TournamentsModule,
    ImportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

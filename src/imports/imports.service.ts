/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClubsService } from 'src/clubs/clubs.service';
import { Club } from 'src/clubs/entities/club.entity';
import { League } from 'src/leagues/entities/league.entity';
import { LeaguesService } from 'src/leagues/leagues.service';
import { PeriodsService } from 'src/periods/periods.service';
import { Player } from 'src/players/entities/player.entity';
import { PlayersService } from 'src/players/players.service';
import { SuperUnion } from 'src/super-unions/entities/super-union.entity';
import { SuperUnionsService } from 'src/super-unions/super-unions.service';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { CreateImportDto } from './dto/create-import.dto';
import { Import } from './entities/import.entity';

@Injectable()
export class ImportsService {
  constructor(
    @InjectModel('Import')
    private readonly ImportModel: Model<Import>,
    private readonly tournamentsService: TournamentsService,
    private readonly periodsService: PeriodsService,
    private readonly playersService: PlayersService,
    private readonly superUnionsService: SuperUnionsService,
    private readonly leaguesService: LeaguesService,
    private readonly clubsService: ClubsService,
  ) {}
  async ImportJogosPPSR(impData: CreateImportDto) {
    const data = impData.dataSheet as any[];

    const _idPeriod = `${impData.dateInitial}a${impData.dateFinish}`;

    // Excluindo os movimentos anteriores caso seja feito mais de uma vez.
    try {
      await this.tournamentsService.removePeriod(_idPeriod);
    } catch (error) {
      console.log('Erro ao excluir tournaments', error);
    }

    const superUnions: Array<SuperUnion> =
      await this.superUnionsService.findAll();
    const newSuperUnions: Array<SuperUnion> = [];

    const leagues: Array<League> = await this.leaguesService.findAll();
    const newLeagues: Array<League> = [];

    const clubs: Array<Club> = await this.clubsService.findAll();
    const newClubs: Array<Club> = [];

    const players: Array<Player> = await this.playersService.findAll();
    const newPlayers: Array<Player> = [];

    const newTournaments: Array<Tournament> = [];

    // Tratando o Período
    const period = await this.periodsService.findOne(_idPeriod);
    if (!period) {
      await this.periodsService.create({
        _id: _idPeriod,
        dateInitial: impData.dateInitial,
        dateFinish: impData.dateFinish,
      });
    }
    const colData = 0; // A
    const colIdSuperUnion = 1; // B
    const colIdLeague = 2; // C
    const colIdClub = 3; // D
    const colNomeClub = 4; // E
    const colIdPlayer = 5; // F
    const colApelido = 6; // G
    const colNameMemorando = 7; // H
    const colBuyIn = 9; // J

    let colTaxa = 0;
    let _dateUTC = '';
    let _tableName = '';
    let _tableInformation = '';
    let _startTime = '';
    let _by = '';

    data.forEach(async (element) => {
      const tamanho = element.length;
      if (tamanho === 14) {
        colTaxa = 12; // M
      } else if (tamanho === 15) {
        colTaxa = 13; // N
      } else if (tamanho === 16) {
        colTaxa = 14; // O
      }

      if (tamanho === 2) {
        _dateUTC = element[colData].split(' ')[0];
        if (element[1].trim().toLowerCase().startsWith('table name:')) {
          _tableName = element[1].split(':')[1].trim();
        }
        if (element[1].trim().toLowerCase().startsWith('start time:')) {
          const dados = element[1].split('e: ');
          const dados2 = dados[1].trim().toLowerCase().split('by');
          _startTime = dados2[0];
          _by = dados[1];
        }
        if (element[1].trim().toLowerCase().startsWith('table information:')) {
          _tableInformation = element[1].split(':')[1].trim();
        }
      }

      if (tamanho >= 14 && element[colData] === null && element[1] !== null) {
        const dado = element[1];
        if (dado !== 'ID da SuperUnion') {
          // Validando SuperUnion
          let superUnion = superUnions.find(
            (su) => su._id === element[colIdSuperUnion],
          );
          if (!superUnion) {
            superUnion = newSuperUnions.find(
              (su) => su._id === element[colIdSuperUnion],
            );
            if (!superUnion) {
              superUnion = {
                _id: element[colIdSuperUnion],
                name: element[colIdSuperUnion],
              };
              newSuperUnions.push(superUnion);
            }
          }
          // Validando League
          let league = leagues.find((le) => le._id === element[colIdLeague]);
          if (!league) {
            league = newLeagues.find((le) => le._id === element[colIdLeague]);
            if (!league) {
              league = {
                _id: element[colIdLeague],
                name: element[colIdLeague],
              };
              newLeagues.push(league);
            }
          }
          // Validando Clubs
          let club = clubs.find((c) => c._id === element[colIdClub]);
          if (!club) {
            club = newClubs.find((c) => c._id === element[colIdClub]);
            if (!club) {
              club = {
                _id: element[colIdClub],
                name: element[colNomeClub],
              };
              newClubs.push(club);
            }
          }
          // Validando Players
          let player = players.find((p) => p._id === element[colIdPlayer]);
          if (!player) {
            player = newPlayers.find((p) => p._id === element[colIdPlayer]);
            if (!player) {
              player = {
                _id: element[colIdPlayer],
                apelido: element[colApelido],
                nameMemorando: element[colNameMemorando],
              };
              newPlayers.push(player);
            }
          }
          try {
            const tournament = {
              _id: `${superUnion._id}-${league._id}-${club._id}-${player._id}-${_idPeriod}`,
              tableName: _tableName,
              tableInformation: _tableInformation,
              startTime: _startTime,
              by: _by,
              dateUTC: _dateUTC,
              _idPeriod,
              _idSuperUnion: superUnion._id,
              _idLeague: league._id,
              _idClub: club._id,
              nomeClub: club.name,
              _idPlayer: player._id,
              playerApelido: player.apelido,
              playerNameMemorando: player.nameMemorando,
              buyInFichas: element[colBuyIn],
              taxa: element[colTaxa],
              resultado: element[colBuyIn] - element[colTaxa],
            };
            if (!newTournaments.find((t) => t._id === tournament._id)) {
              newTournaments.push(tournament);
            }
          } catch (error) {
            console.log('Erro no Tournament', error);
          }
        }
      }
    });
    console.log(`Processou [${newSuperUnions.length}] SuperUnions`);
    this.superUnionsService.createList(newSuperUnions);
    console.log(`Processou [${newLeagues.length}] Leagues`);
    this.leaguesService.createList(newLeagues);
    console.log(`Processou [${newClubs.length}] Clubs`);
    this.clubsService.createList(newClubs);
    console.log(`Processou [${newPlayers.length}] Players`);
    this.playersService.createList(newPlayers);
    console.log(`Processou [${newTournaments.length}] Tournaments`);
    this.tournamentsService.createList(newTournaments);

    console.log('Terminou');
    return { statusCode: 200, message: ['Processamento concluído'] };
  }
}

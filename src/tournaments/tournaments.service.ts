import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTournamentDto as CreateDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto as UpdateDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel('Tournament')
    private readonly entityModel: Model<Tournament>,
  ) {}

  async createList(createListDto: CreateDto[]) {
    const retorno = {
      response: [],
      erros: [],
    };
    this.entityModel
      .insertMany(createListDto, {
        ordered: false,
      })
      .then((response) => {
        retorno.response = response;
        retorno.erros = [];
      })
      .catch((erro) => {
        retorno.erros = [erro];
      });
    return retorno;
  }

  async create(createDto: CreateDto) {
    const entity = new this.entityModel(createDto);
    return entity.save();
  }

  async findAll(): Promise<Tournament[]> {
    return await this.entityModel.find();
  }

  async findByPeriod(idPeriod): Promise<Tournament[]> {
    return await this.entityModel.find({
      _idPeriod: idPeriod,
    });
  }

  async findOne(id: string): Promise<Tournament> {
    const model = this.entityModel.findOne({ _id: id });

    if (!model) {
      throw new NotFoundException('Tournament not found.');
    }
    return model;
  }

  async update(id: string, updateDto: UpdateDto) {
    return await this.entityModel.updateOne({ _id: id }, updateDto);
  }

  async remove(id: string) {
    return await this.entityModel.findByIdAndRemove(id).exec();
  }

  async removePeriod(idPeriod: string) {
    return await this.entityModel.deleteMany({
      _idPeriod: idPeriod,
    });
  }
}

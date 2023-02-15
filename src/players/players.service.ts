import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto as CreateDto } from './dto/create-player.dto';
import { UpdatePlayerDto as UpdateDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly entityModel: Model<Player>,
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

  async findAll(): Promise<Player[]> {
    return await this.entityModel.find();
  }

  async findOne(id: string): Promise<Player> {
    const model = this.entityModel.findOne({ _id: id });

    if (!model) {
      throw new NotFoundException('Player not found.');
    }
    return model;
  }

  async update(id: string, updateDto: UpdateDto) {
    return await this.entityModel.updateOne({ _id: id }, updateDto);
  }

  async remove(id: string) {
    return await this.entityModel.findByIdAndRemove(id).exec();
  }
}

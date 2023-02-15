import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClubDto as CreateDto } from './dto/create-club.dto';
import { UpdateClubDto as UpdateDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel('Club')
    private readonly entityModel: Model<Club>,
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

  async findAll(): Promise<Club[]> {
    return await this.entityModel.find();
  }

  async findOne(id: string): Promise<Club> {
    const model = this.entityModel.findOne({ _id: id });

    if (!model) {
      throw new NotFoundException('Club not found.');
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

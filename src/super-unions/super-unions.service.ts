import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSuperUnionDto as CreateDto } from './dto/create-super-union.dto';
import { UpdateSuperUnionDto as UpdateDto } from './dto/update-super-union.dto';
import { SuperUnion } from './entities/super-union.entity';

@Injectable()
export class SuperUnionsService {
  constructor(
    @InjectModel('SuperUnion')
    private readonly entityModel: Model<SuperUnion>,
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

  async findAll(): Promise<SuperUnion[]> {
    return await this.entityModel.find();
  }

  async findOne(id: string): Promise<SuperUnion> {
    const model = this.entityModel.findOne({ _id: id });

    if (!model) {
      throw new NotFoundException('SuperUnion not found.');
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

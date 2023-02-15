import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePeriodDto as CreateDto } from './dto/create-period.dto';
import { UpdatePeriodDto as UpdateDto } from './dto/update-period.dto';
import { Period } from './entities/period.entity';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectModel('Period')
    private readonly entityModel: Model<Period>,
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

  create(createDto: CreateDto) {
    const entity = new this.entityModel(createDto);
    return entity.save();
  }

  async findAll(): Promise<Period[]> {
    return await this.entityModel.find();
  }

  async findOne(id: string): Promise<Period> {
    const model = this.entityModel.findOne({ _id: id });

    if (!model) {
      throw new NotFoundException('Period not found.');
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

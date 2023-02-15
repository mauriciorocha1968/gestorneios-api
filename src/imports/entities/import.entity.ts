/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ImportProps extends Document {
  rowIndex: number;
  dateInitial: string;
  dateFinish: string;
  nameSheet: string;
  dataSheet: [];
  registers: number;
}

@Schema()
export class Import {
  constructor(props: ImportProps) {
    Object.assign(this, props);
  }
  @Prop({ required: false })
  rowIndex: number;

  @Prop({ required: false })
  dateInitial: Date;

  @Prop({ required: false })
  dateFinish: string;

  @Prop({ required: false })
  nameSheet: string;

  @Prop({ required: false })
  dataSheet: [];

  @Prop({ required: false })
  registers: number;
}

export const ImportSchema = SchemaFactory.createForClass(Import);

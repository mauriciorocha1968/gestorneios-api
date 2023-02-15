import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface PeriodProps extends Document {
  dateInitial: string;
  dateFinish: string;
}

@Schema()
export class Period {
  constructor(props: PeriodProps) {
    Object.assign(this, props);
  }
  @Prop({
    type: String,
    required: true,
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  dateInitial: string;

  @Prop({
    type: String,
    required: true,
  })
  dateFinish: string;
}

export const PeriodSchema = SchemaFactory.createForClass(Period);

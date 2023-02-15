import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface LeagueProps extends Document {
  name: string;
}

@Schema()
export class League {
  constructor(props: LeagueProps) {
    Object.assign(this, props);
  }
  @Prop({
    type: String,
    required: true,
  })
  _id: string;

  @Prop({
    type: String,
  })
  name: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);

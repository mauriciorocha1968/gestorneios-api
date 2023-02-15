import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ClubProps extends Document {
  name: string;
}

@Schema()
export class Club {
  constructor(props: ClubProps) {
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

export const ClubSchema = SchemaFactory.createForClass(Club);

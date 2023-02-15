import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface PlayerProps extends Document {
  apelido: string;
  nameMemorando: string;
}

@Schema()
export class Player {
  constructor(props: PlayerProps) {
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
  apelido: string;

  @Prop({
    type: String,
  })
  nameMemorando: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

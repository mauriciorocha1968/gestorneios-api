import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface TournamentProps extends Document {
  _id: string;
  tableName: string;
  tableInformation: string;
  startTime: string;
  by: string;
  dateUTC: string;
  _idPeriod: string;
  _idSuperUnion: string;
  _idLeague: string;
  _idClub: string;
  nomeClub: string;
  _idPlayer: string;
  playerApelido: string;
  playerNameMemorando: string;
  buyInFichas: number;
  taxa: number;
  resultado: number;
}

@Schema()
export class Tournament {
  constructor(props: TournamentProps) {
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
  tableName: string;

  @Prop({
    type: String,
  })
  tableInformation: string;

  @Prop({
    type: String,
  })
  startTime: string;

  @Prop({
    type: String,
  })
  by: string;

  @Prop({
    type: String,
  })
  dateUTC: string;

  @Prop({
    type: String,
  })
  _idPeriod: string;

  @Prop({
    type: String,
  })
  _idSuperUnion: string;

  @Prop({
    type: String,
  })
  _idLeague: string;

  @Prop({
    type: String,
  })
  _idClub: string;

  @Prop({
    type: String,
  })
  nomeClub: string;

  @Prop({
    type: String,
  })
  _idPlayer: string;

  @Prop({
    type: String,
  })
  playerApelido: string;

  @Prop({
    type: String,
  })
  playerNameMemorando: string;

  @Prop({
    type: Number,
  })
  buyInFichas: number;

  @Prop({
    type: Number,
  })
  taxa: number;

  @Prop({
    type: Number,
  })
  resultado: number;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);

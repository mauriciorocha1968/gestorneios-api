import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface SuperUnionProps extends Document {
  name: string;
}

@Schema()
export class SuperUnion {
  constructor(props: SuperUnionProps) {
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

export const SuperUnionSchema = SchemaFactory.createForClass(SuperUnion);

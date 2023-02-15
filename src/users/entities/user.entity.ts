import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export interface UserProps extends Document {
  name: string;
  password: string;
  role: string;
  email: string;
}

@Schema()
export class User {
  constructor(props: UserProps) {
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

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  role: string;

  @Prop({
    type: String,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (err) {
    return next(err);
  }
});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Cart } from './cart.entity';

@Schema()
export class User extends Document{
  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: 'user'})
  role: string;

  @Prop({ type: Number, required: false })
  age?: number;

  @Prop({ required: false, default: '' })
  image: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Cart.name, immutable: true })
  cart?: Cart | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

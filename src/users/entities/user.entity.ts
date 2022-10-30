import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Cart } from './cart.entity';

@Schema()
export class User extends Document{
  @Prop({ required: true })
  username: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ required: false, default: '' })
  image?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Cart.name, immutable: true })
  cart?: Cart | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

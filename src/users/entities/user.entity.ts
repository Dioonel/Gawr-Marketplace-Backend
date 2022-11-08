import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Cart } from './cart.entity';
import { Posting } from './../../postings/entities/posting.entity';

@Schema()
export class User extends Document{
  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'user', immutable: true })
  role: string;

  @Prop({ type: Number, required: false })
  age: number;

  @Prop({ required: false, default: '' })
  image: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Cart.name, immutable: true })
  cart: Cart | Types.ObjectId;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: Posting.name }] })
  postings: Types.Array<Posting>;

  @Prop({ required: true, type: Date , default: new Date() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

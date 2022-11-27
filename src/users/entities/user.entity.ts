import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Role, Gender, CountryCode } from './../dtos/enums';
import { Cart } from './cart.entity';
import { Posting } from './../../postings/entities/posting.entity';

@Schema()
export class User extends Document{
  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, default: Role.USER, immutable: true, enum: Role })
  role: Role;

  @Prop({ type: Number, required: false })
  age: number;

  @Prop({ required: false, default: 'https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png' })
  image: string;

  @Prop({ required: false, default: '' })
  email: string;

  @Prop({ required: false, default: '' })
  bio: string;

  @Prop({ type: String, default: Gender.OTHER, enum: Gender })
  gender: Gender;

  @Prop({ required: false, default: '' })
  social: string;

  @Prop({ type: String, default: CountryCode.OTHER, enum: CountryCode })
  country: CountryCode;

  @Prop({ required: true, type: Types.ObjectId, ref: Cart.name, immutable: true })
  cart: Cart | Types.ObjectId;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: Posting.name }] })
  postings: Types.Array<Posting>;

  @Prop({ required: true, type: Date , default: new Date() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

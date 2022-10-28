import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
  @Prop({ required: true })
  username: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ required: false, default: '' })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from './user.entity';
import { Posting } from './../../postings/entities/posting.entity';

@Schema()
export class Cart extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', default: '' })
  user: User | Types.ObjectId;

  @Prop({ type: [{
    posting: { required: true, type: Types.ObjectId, ref: Posting.name, immutable: true },
    quantity: { required: true, type: Number, default: 1 },
    subtotal: { required: false, type: Number }
  }], immutable: false })
  items: Types.Array<Record<string, any>> | undefined[];

  @Prop({ required: false, type: Number })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

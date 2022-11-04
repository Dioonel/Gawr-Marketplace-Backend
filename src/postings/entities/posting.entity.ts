import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from './../../products/entities/product.entity';
import { User } from './../../users/entities/user.entity';

@Schema()
export class Posting extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', immutable: true })
  seller: User | Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name, immutable: true })
  product: Product | Types.ObjectId;

  @Prop({ required: true })
  description: string;
}

export const PostingSchema = SchemaFactory.createForClass(Posting);

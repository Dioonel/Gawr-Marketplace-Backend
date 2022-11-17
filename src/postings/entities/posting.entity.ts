import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from './../../products/entities/product.entity';
import { User } from './../../users/entities/user.entity';
import { Comment } from './comment.entity';

@Schema()
export class Posting extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', immutable: true })
  seller: User | Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name, immutable: true })
  product: Product | Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, type: [{ type: Types.ObjectId, ref: Comment.name }] })
  comments: Types.Array<Comment>;

  @Prop({ required: true, type: Date , default: new Date() })
  created_at: Date;
}

export const PostingSchema = SchemaFactory.createForClass(Posting);

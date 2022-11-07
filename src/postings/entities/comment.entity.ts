import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from './../../users/entities/user.entity';
import { Posting } from './posting.entity';

@Schema()
export class Comment extends Document{
  @Prop({ required: true, type: Types.ObjectId, ref: 'users', immutable: true })
  user: User | Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'postings', immutable: true })
  posting: Posting | Types.ObjectId;

  @Prop({ required: true, immutable: true })
  body: string;

  @Prop({ required: true, type: Date , default: new Date() })
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document{
  @Prop({ required: true })
  product: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: false, default: '' })
  image?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from './../../products/entities/product.entity';

@Schema()
export class Cart extends Document{
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

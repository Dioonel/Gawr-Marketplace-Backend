import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

//import { Item } from './../../products/entities/item.entity';
import { Product } from 'src/products/entities/product.entity';

@Schema()
export class Cart extends Document{
  // @Prop({ required: true, type: [{ type: Types.ObjectId, ref: Item.name }] })
  //items: Types.Array<Item>;

  @Prop({ type: [{
    product: { required: true, type: Types.ObjectId, ref: Product.name},
    quantity: { required: true, type: Number, default: 1 }
  }]})
  items: Types.Array<Record<string, any>>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

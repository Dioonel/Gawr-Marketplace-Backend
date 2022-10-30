import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCartDTO } from './../dtos/carts.dtos';
import { Cart } from './../entities/cart.entity';

@Injectable()
export class CartsStoreService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getAll() {
    return await this.cartModel.find().populate('products');
  }

  async getOne(id: string) {
    return await this.cartModel.findById(id);
  }

  async create(){
    const newCart = new this.cartModel();
    return await newCart.save();
  }

  // async update(id: string, changes: any){
  //   const cart = await this.cartModel.findByIdAndUpdate(id, {$set: changes}, { new: true });
  //   if (!cart) {
  //     throw new NotFoundException("Couldn't update cart. ID not found.");
  //   }
  //   return cart;
  // }

  async pushItem(cartId: string, productId: string){
    return await this.cartModel.findByIdAndUpdate(cartId, { $addToSet: { products: productId }}, { new: true }).populate('products');
  }

  async popItem(cartId: string, productId: string){
    return await this.cartModel.findByIdAndUpdate(cartId, { $pull: { products: productId }}, { new:true }).populate('products');
  }

  async empty(id: string){
    return await this.cartModel.findByIdAndUpdate(id, { products: [] }, { new: true });
  }
}

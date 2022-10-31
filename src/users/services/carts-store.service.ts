import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from './../entities/cart.entity';

@Injectable()
export class CartsStoreService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getAll() {
    return await this.cartModel.find().populate('products');
  }

  async getOne(id: string) {
    const cart = await this.cartModel.findById(id);
    if(!cart){
      throw new NotFoundException("ID not found.");
    }
    return cart;
  }

  async create(){
    const newCart = new this.cartModel();
    return await newCart.save();
  }

  async pushItem(cartId: string, productId: string){
    const cart = await this.cartModel.findByIdAndUpdate(cartId, { $addToSet: { products: productId }}, { new: true }).populate('products');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }

  async popItem(cartId: string, productId: string){
    const cart = await this.cartModel.findByIdAndUpdate(cartId, { $pull: { products: productId }}, { new:true }).populate('products');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }

  async empty(id: string){
    const cart = await this.cartModel.findByIdAndUpdate(id, { products: [] }, { new: true });
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }
}

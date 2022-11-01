import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from './../entities/cart.entity';
import { CreateItemDTO } from 'src/products/dtos/items.dtos';

@Injectable()
export class CartsStoreService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getAll() {
    return await this.cartModel.find()
      .populate({ path: 'items.product', select: '-__v'})
      .select('-__v');
  }

  async getOne(id: string) {
    const cart = await this.cartModel.findById(id)
      .populate({ path: 'items.product', select: '-__v'})
      .select('-__v');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }

  async create(){
    const newCart = new this.cartModel();
    return await newCart.save();
  }

  async pushItem(cartId: string, newItem: CreateItemDTO){
    const cart = await this.cartModel.findById(cartId).populate('items.product');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    const index = cart.items.findIndex(item => item.product._id.toString() === newItem.product);
    if(index === -1) {
      return await this.cartModel.findByIdAndUpdate(cartId, { $addToSet: { items: newItem }}, { new: true })  // If item is not in cart, add it
        .populate({ path: 'items.product', select: '-__v'})
        .select('-__v');
    }
    cart.items[index].quantity += newItem.quantity;                                                 // If item is already in cart, add quantity
    await cart.save();
    return await this.cartModel.findById(cartId)
      .populate({ path: 'items.product', select: '-__v'})
      .select('-__v');
  }

  async popItem(cartId: string, itemId: string){
    const cart = await this.cartModel.findByIdAndUpdate(cartId, { $pull: { items: itemId }}, { new: true })
      .populate({ path: 'items.product', select: '-__v'})
      .select('-__v');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }

  async empty(id: string){
    const cart = await this.cartModel.findByIdAndUpdate(id, { items: [] }, { new: true })
      .select('-__v');
    if(!cart){
      throw new NotFoundException("Cart not found.");
    }
    return cart;
  }
}

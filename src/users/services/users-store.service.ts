import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { User } from './../entities/user.entity';

@Injectable()
export class UsersStoreService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find()
      .populate({path: 'cart', select: '-__v', populate: {path: 'items.product', select: '-__v'}})
      .select('-__v');
  }

  async getOne(id: string) {
    const user = await this.userModel.findById(id)
      .populate({path: 'cart', select: '-__v', populate: {path: 'items.product', select: '-__v'}})
      .select('-__v');
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  async getByUsername(username: string) {
    const user = await this.userModel.findOne({ username })
      .populate({path: 'cart', select: '-__v', populate: {path: 'items.product', select: '-__v'}})
      .select('-__v');
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  async create(data: CreateUserDTO){
    try {
      const newUser = new this.userModel(data);
      const hashPass = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashPass;
      let user = await newUser.save();
      const { password, ...res } = user.toJSON()                                                // Remove password from response
      return res;
    } catch (err) {
      throw new BadRequestException("Please choose another username.");
    }
  }

  async update(id: string, changes: UpdateUserDTO){
    const user = await this.userModel.findByIdAndUpdate(id, {$set: changes}, {new: true})
      .populate({path: 'cart', select: '-__v', populate: {path: 'items.product', select: '-__v'}})
      .select('-__v');
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  async delete(id: string){
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return true;
  }

  async getCartByUserId(userId: string){
    const cart = await this.userModel.findById(userId)
      .select('cart')
      .populate({path: 'cart', select: '-__v', populate: {path: 'items.product', select: '-__v'}});
    if (!cart){
      throw new NotFoundException("User/cart not found.");
    }
    return cart.cart;
  }
}

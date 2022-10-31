import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { User } from './../entities/user.entity';

@Injectable()
export class UsersStoreService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find()
    .populate({path: 'cart', select: '-__v', populate: {path: 'products', select: '-__v'}})
    .select('-__v');
  }

  async getOne(id: string) {
    const user = await this.userModel.findById(id)
    .populate({path: 'cart', select: '-__v', populate: {path: 'products', select: '-__v'}})
    .select('-__v');
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  async create(data: CreateUserDTO){
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDTO){
    const user = await this.userModel.findByIdAndUpdate(id, {$set: changes}, {new: true})
    .populate({path: 'cart', select: '-__v', populate: {path: 'products', select: '-__v'}})
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
}

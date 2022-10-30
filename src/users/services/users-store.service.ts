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
    .populate({path: 'cart', populate: {path: 'products'}});
  }

  async getOne(id: string) {
    return await this.userModel.findById(id)
    .populate({path: 'cart', populate: {path: 'products'}});
  }

  async create(data: CreateUserDTO){
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async update(id: string, changes: UpdateUserDTO){
    const user = await this.userModel.findByIdAndUpdate(id, {$set: changes}, {new: true})
    .populate({path: 'cart', populate: {path: 'products'}});
    if (!user) {
      throw new NotFoundException("Couldn't update user. ID not found.");
    }
    return user;
  }

  async delete(id: string){
    return this.userModel.findByIdAndDelete(id);
  }
}

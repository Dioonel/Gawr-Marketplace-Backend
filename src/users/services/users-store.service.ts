import { BadRequestException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { User } from './../entities/user.entity';
import { CartsService } from './../services/carts.service';
import { PostingsService } from './../../postings/services/postings.service';

@Injectable()
export class UsersStoreService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cartService: CartsService,
    @Inject(forwardRef(() => PostingsService))
    private postingsService: PostingsService
  ) {}

  async getAll(filter?: FilterQuery<User>, limit?: number | undefined, offset?: number | undefined) {
    if(filter){
      return await this.userModel.find(filter)
        .limit(limit || null)
        .skip((limit || 1) * offset || 0)
        .select(['-__v', '-password']);
    }
    return await this.userModel.find()
      .select(['-__v', '-password']);
  }

  async getOne(id: string) {
    const user = await this.userModel.findById(id)
      .populate({path: 'postings', select: '-__v'})
      .select(['-__v', '-password']);
    if (!user) {
      throw new NotFoundException("User not found.");
    }
    return user;
  }

  async getByUsername(username: string) {
    const user = await this.userModel.findOne({ username })
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
      await this.cartService.delete(data.cart);
      throw new BadRequestException("Please choose another username.");
    }
  }

  async update(id: string, changes: UpdateUserDTO){
    const user = await this.userModel.findByIdAndUpdate(id, {$set: changes}, {new: true, runValidators: true})
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

  async pushPosting(userId: string, postingId: string) {
    const user = await this.userModel.findByIdAndUpdate(userId, { $addToSet: { postings: postingId }}, {new: true})
      .select('-__v');
  if (!user) {
    await this.postingsService.delete(postingId, userId);
    throw new NotFoundException("User not found.");
  }
  return user;
  }

  async popPosting(userId: string, postingId: string) {
    const user = await this.userModel.findByIdAndUpdate(userId, { $pull: { postings: postingId }}, {new: true})
      .select('-__v');
  if (!user) {
    throw new NotFoundException("User not found.");
  }
  return user;
  }
}

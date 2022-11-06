import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePostingDTO, UpdatePostingDTO } from './../dtos/posting.dto';
import { Posting } from './../entities/posting.entity';

@Injectable()
export class PostingsStoreService {
  constructor(@InjectModel(Posting.name) private postingModel: Model<Posting>) {}

  async getAll() {
    return await this.postingModel.find().select('-__v');
  }

  async getOne(id: string){
    const post = await this.postingModel.findById(id).select('-__v').populate({ path: 'product', select: '-__v'});
    if (!post) {
      throw new NotFoundException("Post not found.");
    }
    return post;
  }

  async create(data: CreatePostingDTO){
    const newPost = new this.postingModel(data);
    return await newPost.save();
  }

  async getPostingsFromUser(userId: string){
    const posts = await this.postingModel.find({ seller: userId }).select('-__v');
    if (!posts) {
      throw new NotFoundException("User not found.");
    }
    return posts;
  }

  async delete(id){
    const post = await this.postingModel.findByIdAndDelete(id);
    if(!post) {
      throw new NotFoundException("Post not found.");
    }
    return true;
  }

  async deleteAllPostingsFromUser(userId){
    const data = await this.postingModel.deleteMany({ seller: userId });
    if(!data) {
      return null;
    }
    return data;
  }
}

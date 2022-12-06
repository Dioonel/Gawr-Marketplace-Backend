import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { CreatePostingDTO, FilterPostingDTO } from './../dtos/posting.dto';
import { Posting } from './../entities/posting.entity';
import { User } from './../../users/entities/user.entity';
import { CommentsService } from './comments.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class PostingsStoreService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<Posting>,
    private commentsService: CommentsService,
    ) {}

  async getAll(query?: FilterPostingDTO) {
    if(!isEmpty(query)){
      const filter: FilterQuery<Posting> = {};
      if(query.title) filter.title = { $regex: query.title, $exists: true, $options: 'i' };
      if(query.minPrice) filter.price = { $gte: query.minPrice };
      if(query.maxPrice) filter.price = { ...filter.price, $lte: query.maxPrice };

      return await this.postingModel.find(filter)
        .limit(query.limit || 18)
        .skip((query.limit || 18) * query.offset || 0)
        .select('-__v');
    }
    const data = await this.postingModel.find()
    .select('-__v');

    const count = await this.postingModel.estimatedDocumentCount();

    return { data, count };
  }

  async getOne(id: string){
    const post = await this.postingModel.findById(id)
    .populate({ path: 'seller', select: 'username image', model: User.name })
    .populate({ path: 'comments', select: '-__v', populate: { path: 'user', select: 'username image', model: User.name }})
    .select('-__v');
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
    const posts = await this.postingModel.find({ seller: userId })
    .select('-__v');
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

  async deletePostingsFromUser(userId){
    const data = await this.postingModel.deleteMany({ seller: userId });
    if(!data) {
      return null;
    }
    return data;
  }

  async pushComment(postId, commentId){
    const post = await this.postingModel.findByIdAndUpdate(postId, { $push: { comments: commentId }}, { new: true })
    .populate({ path: 'comments', select: '-__v', populate: { path: 'user', select: 'username image', model: User.name }})
    .select('-__v');
    if(!post) {
      await this.commentsService.forceDelete(commentId);
      throw new NotFoundException('Post not found?');
    }
    return post;
  }

  async popComment(postId, commentId){
    const post = await this.postingModel.findByIdAndUpdate(postId, { $pull: { comments: commentId }}, {new: true})
      .select('-__v');
    if (!post) {
      throw new NotFoundException("Post not found.");
      }
    return post;
  }
}

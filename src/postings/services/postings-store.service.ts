import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { CreatePostingDTO, FilterPostingDTO } from './../dtos/posting.dto';
import { Posting } from './../entities/posting.entity';
import { User } from './../../users/entities/user.entity';
import { Product } from './../../products/entities/product.entity';
import { CommentsService } from './comments.service';
import { ProductsService } from './../../products/services/products.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class PostingsStoreService {
  constructor(
    @InjectModel(Posting.name) private postingModel: Model<Posting>,
    private commentsService: CommentsService,
    private productsService: ProductsService
    ) {}

  async getAll(query?: FilterPostingDTO) {
    if(!isEmpty(query)){
      const filterPosts: FilterQuery<Posting> = {};
      const filterProducts: FilterQuery<Product> = {};

      if(query.title) filterPosts.title = { $regex: query.title, $exists: true, $options: 'i' }

      if(query.minPrice) filterProducts.price = { $gte: query.minPrice };

      if(query.maxPrice) filterProducts.price = { ...filterProducts.price, $lte: query.maxPrice };

      const filteredProducts = await this.productsService.getAll(filterProducts);
      const filteredIds = filteredProducts.map(product => product._id);
      filterPosts.product = { $in: filteredIds }

      return await this.postingModel.find(filterPosts)
      .limit(query.limit || null)
      .skip((query.limit || 1) * query.offset || 0)
      .select('-__v');
    }
    return await this.postingModel.find().select('-__v');
  }

  async getOne(id: string){
    const post = await this.postingModel.findById(id)
    .populate({ path: 'product', select: '-__v'})
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

  async pushComment(postId, commentId){
    const post = await this.postingModel.findByIdAndUpdate(postId, { $push: { comments: commentId }}, { new: true })
    .populate({ path: 'product', select: '-__v'})
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

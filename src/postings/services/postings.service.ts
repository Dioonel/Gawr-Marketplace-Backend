import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { PostingsStoreService } from './postings-store.service';
import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './../../users/services/users.service';
import { CommentsService } from './comments.service';
import { rawPostingDTO, CreatePostingDTO, FilterPostingDTO } from './../dtos/posting.dto';
import { Posting } from './../entities/posting.entity';
import { Comment } from './../entities/comment.entity';
import { Product } from './../../products/entities/product.entity';
import { filter } from 'rxjs';

@Injectable()
export class PostingsService {
  constructor(
    private postingsStore: PostingsStoreService,
    private productsService: ProductsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService
    ) {}

  async getAll(query?: FilterPostingDTO) {
    return await this.postingsStore.getAll(query);
  }

  async getOne(id: string) {
    return await this.postingsStore.getOne(id);
  }

  async create(data: rawPostingDTO, userId: string) {
    const product = await this.productsService.create(data.product);
    const myPosting: CreatePostingDTO = {
      seller: userId,
      product: product._id,
      title: data.title,
      image: data.image || '',
      description: data.description
    }
    const post = await this.postingsStore.create(myPosting);
    await this.usersService.pushPosting(userId, post._id);
    return post;
  }

  async getPostingsFromUser(userId: string) {
    return await this.postingsStore.getPostingsFromUser(userId);
  }

  async delete(postingId: string, userId: string) {
    const post = await this.postingsStore.getOne(postingId);
    if(post.seller._id.toString() === userId) {
      const res = await this.postingsStore.delete(postingId);
      await this.productsService.delete(post.product._id);
      await this.usersService.popPosting(userId, post._id);
      return res;
    }
    return { message: "Stop trying to hack please :)" };
  }

  async deleteAllPostingsFromUser(userId: string) {
    return this.postingsStore.deleteAllPostingsFromUser(userId);
  }

  async pushComment(postId: string, commentId: string) {
    return await this.postingsStore.pushComment(postId, commentId);
  }

  async popComment(postId: string, commentId: string) {
    return await this.postingsStore.popComment(postId, commentId);
  }

  async popManyComments(comments: Comment[]) {
    for(let comment of comments){
      await this.postingsStore.popComment(comment.posting, comment._id);
    }
    return true;
  }
}

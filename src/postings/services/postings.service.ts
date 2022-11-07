import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { PostingsStoreService } from './postings-store.service';
import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './../../users/services/users.service';
import { CommentsService } from './comments.service';
import { rawPostingDTO, CreatePostingDTO } from './../dtos/posting.dto';
import { Comment } from './../entities/comment.entity';

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

  async getAll() {
    return await this.postingsStore.getAll();
  }

  async getOne(id: string) {
    return await this.postingsStore.getOne(id);
  }

  async create(data: rawPostingDTO, userId: string) {
    const product = await this.productsService.create(data.product);
    const myPosting: CreatePostingDTO = {
      seller: userId,
      product: product._id,
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
    if(post.seller.toString() === userId) {
      const res = await this.postingsStore.delete(postingId);
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

import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { CreateUserDTO, UpdateUserDTO, FilterUserDTO } from './../dtos/users.dtos';
import { User } from './../entities/user.entity';
import { CartsService } from './carts.service';
import { UsersStoreService } from './users-store.service';
import { PostingsService } from './../../postings/services/postings.service';
import { CommentsService } from './../../postings/services/comments.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class UsersService {
  constructor(
    private userStore: UsersStoreService,
    private cartService: CartsService,
    private commentsService: CommentsService,
    @Inject(forwardRef(() => PostingsService))
    private postingsService: PostingsService
    ) {}

  async getAll(query?: FilterUserDTO){
    if(!isEmpty(query)){
      const filter: FilterQuery<User> = {};
      const { limit, offset } = query;

      if(query.username) filter.username = { $regex: query.username, $exists: true, $options: 'i' };

      return await this.userStore.getAll(filter, limit, offset);
    }
    return await this.userStore.getAll();
  }

  async getOne(id: string){
    return await this.userStore.getOne(id);
  }

  async getByUsername(username: string){
    return await this.userStore.getByUsername(username);
  }

  async create(data: CreateUserDTO){
    const newCart = await this.cartService.create();
    const user = {
      ...data,
      cart: newCart._id
    }
    const newUser = await this.userStore.create(user);
    await this.cartService.initUser(newCart._id, newUser._id);
    return newUser;
  }

  async update(id: string, changes: UpdateUserDTO){
    if(isEmpty(changes)){
      throw new BadRequestException("Invalid data.");
    }
    return await this.userStore.update(id, changes);
  }

  async delete(id: string){
    let cartData = false;
    const cart = await this.cartService.getCartByUser(id);
    cartData = await this.cartService.delete(cart._id);
    const commentsData = await this.commentsService.deleteAllCommentsFromUser(id);
    const postsData = await this.postingsService.deleteAllPostingsFromUser(id);
    const userData = await this.userStore.delete(id);
    return {
      postsDeletion: postsData,
      cartDeletion: cartData,
      commentsData: commentsData,
      userDeletion: userData,
    };
  }

  async pushPosting(userId: string, postingId: string){
    return await this.userStore.pushPosting(userId, postingId);
  }

  async popPosting(userId: string, postingId: string){
    return await this.userStore.popPosting(userId, postingId);
  }
}

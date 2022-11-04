import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { CartsService } from './carts.service';
import { UsersStoreService } from './users-store.service';
import { PostingsService } from './../../postings/services/postings.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class UsersService {
  constructor(
    private userStore: UsersStoreService,
    private cartService: CartsService,
    @Inject(forwardRef(() => PostingsService))
    private postingsService: PostingsService
    ) {}

  async getAll() {
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
    return await this.userStore.create(user);
  }

  async update(id: string, changes: UpdateUserDTO){
    if(isEmpty(changes)){
      throw new BadRequestException("Invalid data.");
    }
    return await this.userStore.update(id, changes);
  }

  async delete(id: string){
    const postsData = await this.postingsService.deleteAllPostingsFromUser(id);
    const userData = await this.userStore.delete(id);
    return {
      postsDeletion: postsData,
      userDeletion: userData,
    };
  }

  async getCartByUserId(userId: string){
    return await this.userStore.getCartByUserId(userId);
  }

  async pushPosting(userId: string, postingId: string){
    return await this.userStore.pushPosting(userId, postingId);
  }

  async popPosting(userId: string, postingId: string){
    return await this.userStore.popPosting(userId, postingId);
  }
}

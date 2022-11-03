import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { CartsService } from './carts.service';
import { UsersStoreService } from './users-store.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class UsersService {
  constructor(private userStore: UsersStoreService, private cartService: CartsService) {}

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
    return await this.userStore.delete(id);
  }

  async getCartByUserId(userId: string){
    return await this.userStore.getCartByUserId(userId);
  }
}

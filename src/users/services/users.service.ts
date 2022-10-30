import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { CartsService } from './carts.service';
import { UsersStoreService } from './users-store.service';

@Injectable()
export class UsersService {
  constructor(private userStore: UsersStoreService, private cartService: CartsService) {}

  async getAll() {
    return await this.userStore.getAll();
  }

  async getOne(id: string){
    return await this.userStore.getOne(id);
  }

  async create(data: CreateUserDTO){
    let newCart = await this.cartService.create();
    let user = {
      ...data,
      cart: newCart._id
    }
    return await this.userStore.create(user);
  }

  async update(id: string, changes: UpdateUserDTO){
    return await this.userStore.update(id, changes);
  }

  async delete(id: string){
    let user = await this.userStore.delete(id);
    if(user) return true;
    else return false;
  }
}

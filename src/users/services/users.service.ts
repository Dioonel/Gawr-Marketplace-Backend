import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { UsersStoreService } from './users-store.service';

@Injectable()
export class UsersService {
  constructor(private userStore: UsersStoreService) {}

  async getAll() {
    return await this.userStore.getAll();
  }

  async getOne(id: string){
    return await this.userStore.getOne(id);
  }

  async create(data: CreateUserDTO){
    return await this.userStore.create(data);
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

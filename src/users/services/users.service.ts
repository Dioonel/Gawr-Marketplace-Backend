import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor() {}

  getAll() {
    return 'all users';
  }

  getOne(id: string){
    if(id){
      return `user ${id}`;
    } else {
      throw new NotFoundException(':(');
    }
  }

  create(data: CreateUserDTO){
    return {
      message: 'user created!',
      data,
    }
  }

  update(id: string, changes: UpdateUserDTO){
    return {
      message: 'updated!',
      id,
      changes,
    }
  }

  delete(id: string){
    return true;
  }
}

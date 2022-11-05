import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { CreateUserDTO } from './../dtos/users.dtos';
import { UsersService } from './../services/users.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  getUsers(){
    return this.usersService.getAll();
  }

  @Get(':id')
  getOneUser(@Param('id', MongoIdPipe) id: string){
    return this.usersService.getOne(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO){
    return this.usersService.create(body);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { UsersService } from './../services/users.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  getProducts(){
    return this.usersService.getAll();
  }

  @Get(':id')
  getOneProduct(@Param('id', MongoIdPipe) id: string){
    return this.usersService.getOne(id);
  }

  @Post()
  createProduct(@Body() body: CreateUserDTO){
    return this.usersService.create(body);
  }

  @Put(':id')
  updateProduct(@Param('id', MongoIdPipe) id: string, @Body() body: UpdateUserDTO){
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.delete(id);
  }
}

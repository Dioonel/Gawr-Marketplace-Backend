import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseFilters } from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './../dtos/users.dtos';
import { UsersService } from './../services/users.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Public()
  @Get()
  getUsers(){
    return this.usersService.getAll();
  }

  @Public()
  @Get(':id')
  getOneUser(@Param('id', MongoIdPipe) id: string){
    return this.usersService.getOne(id);
  }

  @Public()
  @Post()
  createUser(@Body() body: CreateUserDTO){
    return this.usersService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id', MongoIdPipe) id: string, @Body() body: UpdateUserDTO){
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.delete(id);
  }
}

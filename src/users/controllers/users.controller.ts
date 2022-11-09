import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateUserDTO, FilterUserDTO } from '../dtos/users.dto';
import { UsersService } from './../services/users.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get()
  @ApiOperation({ summary: 'Get all users.   *Public*' })
  getUsers(@Query() query: FilterUserDTO){
    return this.usersService.getAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user.   *Public*' })
  getOneUser(@Param('id', MongoIdPipe) id: string){
    return this.usersService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an user.   *Public*' })
  createUser(@Body() body: CreateUserDTO){
    return this.usersService.create(body);
  }
}

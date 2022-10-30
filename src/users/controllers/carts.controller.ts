import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CartsService } from './../services/carts.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService){}

  @Get()
  getCarts(){
    return this.cartsService.getAll();
  }

  @Get(':id')
  getOneCart(@Param('id', MongoIdPipe) id: string){
    return this.cartsService.getOne(id);
  }

  // @Post()
  // createCart(){
  //   return this.cartsService.create();
  // }

  // @Put(':id')
  // updateCart(@Param('id', MongoIdPipe) id: string, @Body() body: any){
  //   return this.cartsService.update(id, body);
  // }

  @Post(':id')
  pushItem(@Param('id', MongoIdPipe) cartId: string, @Body('productId', MongoIdPipe) productId: string) {
    return this.cartsService.pushItem(cartId, productId);
  }

  @Delete(':id')
  popItem(@Param('id', MongoIdPipe) cartId: string, @Body('productId', MongoIdPipe) productId: string) {
    return this.cartsService.popItem(cartId, productId);
  }

  @Delete(':id/empty')
  emptyCart(@Param('id', MongoIdPipe) id: string) {
    return this.cartsService.empty(id);
  }
}

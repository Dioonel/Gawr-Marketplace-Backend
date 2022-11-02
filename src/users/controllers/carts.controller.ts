import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { CartsService } from './../services/carts.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { CreateItemDTO } from './../../products/dtos/items.dtos';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Public } from './../../auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService){}

  @Public()
  @Get()
  getCarts(){                                                           // dev only
    return this.cartsService.getAll();
  }

  @Public()
  @Get(':id')                                                           // dev only
  getOneCart(@Param('id', MongoIdPipe) id: string){
    return this.cartsService.getOne(id);
  }

  @Post(':id')
  pushItem(@Param('id', MongoIdPipe) cartId: string, @Body() body: CreateItemDTO) {
    return this.cartsService.pushItem(cartId, body);
  }

  @Delete(':id')
  popItem(@Param('id', MongoIdPipe) cartId: string, @Body('productId', MongoIdPipe) itemId: string) {
    return this.cartsService.popItem(cartId, itemId);
  }

  @Delete(':id/empty')
  emptyCart(@Param('id', MongoIdPipe) id: string) {
    return this.cartsService.empty(id);
  }
}

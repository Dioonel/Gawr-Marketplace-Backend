import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';


@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {};

  @Get()
  getProducts(){
    return this.productsService.getAll();
  }

  @Get(':id')
  getOneProduct(@Param('id', MongoIdPipe) id: string){
    return this.productsService.getOne(id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDTO){
    return this.productsService.create(body);
  }

  @Put(':id')
  updateProduct(@Param('id', MongoIdPipe) id: string, @Body() body: UpdateProductDTO){
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.delete(id);
  }
}

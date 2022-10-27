import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {};

  @Get()
  getProducts(){
    return this.productsService.getAll();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string){
    return this.productsService.getOne(id);
  }

  @Post()
  createProduct(@Body() body: any){
    return this.productsService.create(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: any){
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}

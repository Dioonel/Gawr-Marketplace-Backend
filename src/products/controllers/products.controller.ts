import { Controller, Get, Param } from '@nestjs/common';

import { ProductsService } from './../services/products.service';
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
}

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { ProductsService } from './../services/products.service';
import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';


@UseGuards(JwtAuthGuard, RolesGuard)                                                          // Guard order MATTERS
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {};

  @Public()
  @Get()
  getProducts(){
    return this.productsService.getAll();
  }

  @Public()
  @Get(':id')
  getOneProduct(@Param('id', MongoIdPipe) id: string){
    return this.productsService.getOne(id);
  }

  @Roles(Role.ADMIN)
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

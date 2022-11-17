import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from './../services/products.service';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {};

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: '*** Dev only, use postings routes instead ***' })
  getProducts(){
    return this.productsService.getAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: '*** Dev only, use postings routes instead ***' })
  getOneProduct(@Param('id', MongoIdPipe) id: string){
    return this.productsService.getOne(id);
  }
}

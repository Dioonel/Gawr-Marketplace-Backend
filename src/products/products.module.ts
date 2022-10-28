import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsStoreService } from './services/products-store.service';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsStoreService],
})
export class ProductsModule {}

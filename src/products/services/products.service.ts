import { Injectable, BadRequestException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import { CreateProductDTO, UpdateProductDTO } from '../dtos/products.dto';
import { ProductsStoreService } from './products-store.service';
import { Product } from './../entities/product.entity';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class ProductsService {
  constructor(private productsStore: ProductsStoreService) {}

  async getAll(filterProducts?: FilterQuery<Product>) {
    return await this.productsStore.getAll(filterProducts);
  }

  async getOne(id: string){
    return await this.productsStore.getOne(id);
  }

  async create(data: CreateProductDTO){
    return await this.productsStore.create(data);
  }

  async update(id: string, changes: UpdateProductDTO){
    if(isEmpty(changes)){
      throw new BadRequestException("Invalid data.");
    }
    return await this.productsStore.update(id, changes);
  }

  async delete(id: string){
    return await this.productsStore.delete(id);
  }
}

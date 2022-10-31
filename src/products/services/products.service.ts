import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';
import { ProductsStoreService } from './products-store.service';
import { isEmpty } from './../../common/extra/fns';

@Injectable()
export class ProductsService {
  constructor(private productsStore: ProductsStoreService) {}

  async getAll() {
    return await this.productsStore.getAll();
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

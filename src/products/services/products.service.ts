import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';
import { ProductsStoreService } from './products-store.service';

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
    return await this.productsStore.update(id, changes);
  }

  async delete(id: string){
    let product = await this.productsStore.delete(id);
    if(product) return true;
    else return false;
  }
}

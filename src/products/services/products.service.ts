import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDTO, UpdateProductDTO } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor() {}

  getAll() {
    return 'all products';
  }

  getOne(id: string){
    if(id){
      return `product ${id}`;
    } else {
      throw new NotFoundException(':(');
    }
  }

  create(data: CreateProductDTO){
    return {
      message: 'product created!',
      data,
    }
  }

  update(id: string, changes: UpdateProductDTO){
    return {
      message: 'product updated!',
      id,
      changes,
    }
  }

  delete(id: string){
    return true;
  }
}

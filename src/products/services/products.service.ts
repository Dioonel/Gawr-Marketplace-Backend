import { Injectable, NotFoundException } from '@nestjs/common';

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

  create(data: any){
    data.created = true;
    return data;
  }

  update(id: string, data: any){
    return {
      message: 'updated!',
      id,
      data,
    }
  }

  delete(id: string){
    return true;
  }
}

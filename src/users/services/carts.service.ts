import { Injectable } from '@nestjs/common';

import { ProductsService } from 'src/products/services/products.service';
import { CartsStoreService } from './carts-store.service';

@Injectable()
export class CartsService {
  constructor(private cartStore: CartsStoreService, private productsService: ProductsService) {}

  async getAll() {
    return await this.cartStore.getAll();
  }

  async getOne(id: string){
    return await this.cartStore.getOne(id);
  }

  async create(){
    return await this.cartStore.create();
  }

  async pushItem(cartId: string, productId: string, quantity: number){
    const product = await this.productsService.getOne(productId);
    if(product){
      return await this.cartStore.pushItem(cartId, {product: productId, quantity});
    }
  }

  async popItem(cartId: string, productId: string){
    let thing = await this.cartStore.popItem(cartId, productId);
    console.log(thing);
    return thing;
  }

  async empty(id: string){
    return await this.cartStore.empty(id);
  }
}

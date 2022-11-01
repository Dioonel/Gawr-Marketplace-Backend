import { Injectable } from '@nestjs/common';

import { ProductsService } from 'src/products/services/products.service';
import { CartsStoreService } from './carts-store.service';
import { CreateItemDTO } from './../../products/dtos/items.dtos';
import { subtotal, total } from 'src/common/extra/fns';

@Injectable()
export class CartsService {
  constructor(private cartStore: CartsStoreService, private productsService: ProductsService) {}

  async getAll() {
    return await this.cartStore.getAll();
  }

  async getOne(id: string){
    let cart = await this.cartStore.getOne(id);
    cart.items = subtotal(cart.items);
    return total(cart);
  }

  async create(){
    return await this.cartStore.create();
  }

  async pushItem(cartId: string, item: CreateItemDTO){
    const product = await this.productsService.getOne(item.product);
    if(product){
      return await this.cartStore.pushItem(cartId, item);
    }
  }

  async popItem(cartId: string, itemId: string){
    return await this.cartStore.popItem(cartId, itemId);
  }

  async empty(id: string){
    return await this.cartStore.empty(id);
  }
}

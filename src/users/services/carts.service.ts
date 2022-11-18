import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { ProductsService } from './../../products/services/products.service';
import { CartsStoreService } from './carts-store.service';
import { CreateItemDTO } from '../../products/dtos/items.dto';
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

  async getCartByUser(userId: string){
    let cart = await this.cartStore.getCartByUser(userId);
    if(cart.items.length > 0){
      cart.items = subtotal(cart.items);
    }
    return total(cart);
  }

  async create(){
    return await this.cartStore.create();
  }

  async initUser(id: string, userId: string){
    return await this.cartStore.initUser(id, userId);
  }

  async pushItem(userId: string, item: CreateItemDTO){
    const product = await this.productsService.getOne(item.product);
    if(product){
      return await this.cartStore.pushItem(userId, item);
    }
  }

  async popItem(userId: string, productId: string){
    return await this.cartStore.popItem(userId, productId);
  }

  async empty(userId: string){
    return await this.cartStore.empty(userId);
  }

  async delete(id: string){
    return await this.cartStore.delete(id);
  }
}

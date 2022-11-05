import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { ProductsService } from './../../products/services/products.service';
import { UsersService } from './users.service';
import { CartsStoreService } from './carts-store.service';
import { CreateItemDTO } from './../../products/dtos/items.dtos';
import { subtotal, total } from 'src/common/extra/fns';

@Injectable()
export class CartsService {
  constructor(
    private cartStore: CartsStoreService,
    private productsService: ProductsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService) {}

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

  async pushItem(userId: string, item: CreateItemDTO){
    const cart = await this.usersService.getCartByUserId(userId);
    const product = await this.productsService.getOne(item.product);
    if(product){
      return await this.cartStore.pushItem(cart._id, item);
    }
  }

  async popItem(userId: string, productId: string){
    const cart = await this.usersService.getCartByUserId(userId);
    return await this.cartStore.popItem(cart._id, productId);
  }

  async empty(userId: string){
    const cart = await this.usersService.getCartByUserId(userId);
    return await this.cartStore.empty(cart._id);
  }

  async delete(id: string){
    return await this.cartStore.delete(id);
  }
}

import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { CartsStoreService } from './carts-store.service';
import { CreateItemDTO } from '../../postings/dtos/items.dto';
import { subtotal, total } from './../../common/extra/fns';
import { PostingsService } from './../../postings/services/postings.service';

@Injectable()
export class CartsService {
  constructor(private cartStore: CartsStoreService, private postingsService: PostingsService) {}

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
    const posting = await this.postingsService.getOne(item.posting);
    if(posting){
      return await this.cartStore.pushItem(userId, item);
    }
  }

  async popItem(userId: string, postId: string){
    return await this.cartStore.popItem(userId, postId);
  }

  async empty(userId: string){
    return await this.cartStore.empty(userId);
  }

  async deletePostFromAllCarts(postId: string){
    return await this.cartStore.deletePostFromAllCarts(postId);
  }

  async delete(id: string){
    return await this.cartStore.delete(id);
  }
}

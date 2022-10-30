import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCartDTO } from './../dtos/carts.dtos';
import { CartsStoreService } from './carts-store.service';

@Injectable()
export class CartsService {
  constructor(private cartStore: CartsStoreService) {}

  async getAll() {
    return await this.cartStore.getAll();
  }

  async getOne(id: string){
    return await this.cartStore.getOne(id);
  }

  async create(){
    return await this.cartStore.create();
  }

  // async update(id: string, changes: any){
  //   return await this.cartStore.update(id, changes);
  // }

  async pushItem(cartId: string, productId: string){
    return await this.cartStore.pushItem(cartId, productId);
  }

  async popItem(cartId: string, productId: string){
    return await this.cartStore.popItem(cartId, productId);
  }

  async empty(id: string){
    return await this.cartStore.empty(id);
  }
}

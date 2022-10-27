import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor() {}

  hi() {
    return 'hi';
  }
}

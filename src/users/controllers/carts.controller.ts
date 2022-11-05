import { Controller, Get } from '@nestjs/common';

import { CartsService } from './../services/carts.service';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService){}

  @Get()
  getCarts(){                                                           // dev only
    return this.cartsService.getAll();
  }
}

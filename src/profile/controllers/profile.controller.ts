import { Controller, Get, Post, Put, Delete, UseGuards, Req, Redirect, UseFilters, Param, Body } from '@nestjs/common';
import { Request } from 'express';

import { PayloadToken } from './../../auth/models/token.model';
import { UsersService } from './../../users/services/users.service';
import { CartsService } from './../../users/services/carts.service';
import { CreateItemDTO } from './../../products/dtos/items.dtos';
import { UpdateUserDTO } from './../../users/dtos/users.dtos';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('my-profile')
export class ProfileController {
  constructor(private usersService: UsersService, private cartsService: CartsService) {}

  @Redirect('users/:id')
  @Get()
  getMyProfile(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return { url: `/users/${payload.sub}` };                                                            // redirect URL
  }

  @Put()
  updateMyProfile(@Req() req: Request, @Body() body: UpdateUserDTO) {
    const payload = req.user as PayloadToken;
    return this.usersService.update(payload.sub, body);
  }

  @Get('cart')
  getMyCart(@Req() req: Request){
    const payload = req.user as PayloadToken;
    return this.usersService.getCartByUserId(payload.sub);
  }

  @Post('cart')
  pushItemToMyCart(@Req() req: Request, @Body() body: CreateItemDTO) {
    const payload = req.user as PayloadToken;
    return this.cartsService.pushItem(payload.sub, body);
  }

  @Delete('cart/empty')
  emptyCartMyCart(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return this.cartsService.empty(payload.sub);
  }

  @Delete('cart/:id')
  popItemToMyCart(@Req() req: Request, @Param('id', MongoIdPipe) productId: string) {
    const payload = req.user as PayloadToken;
    return this.cartsService.popItem(payload.sub, productId);
  }

  @Delete('delete')
  deleteMyProfile(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return this.usersService.delete(payload.sub);
  }
}

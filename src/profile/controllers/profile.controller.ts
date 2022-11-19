import { Controller, Get, Post, Put, Delete, UseGuards, Req, Redirect, UseFilters, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PayloadToken } from './../../auth/models/token.model';
import { UsersService } from './../../users/services/users.service';
import { CartsService } from './../../users/services/carts.service';
import { CreateItemDTO } from './../../postings/dtos/items.dto';
import { UpdateUserDTO } from '../../users/dtos/users.dto';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';

@ApiTags('my-profile')
@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('my-profile')
export class ProfileController {
  constructor(private usersService: UsersService, private cartsService: CartsService) {}

  @Redirect('users/:id')
  @Get()
  @ApiOperation({ summary: 'Redirect to your profile.   *JWT required*' })
  getMyProfile(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return { url: `/users/${payload.sub}` };                                                            // redirect URL
  }

  @Put()
  @ApiOperation({ summary: 'Update your profile.   *JWT required*' })
  updateMyProfile(@Req() req: Request, @Body() body: UpdateUserDTO) {
    const payload = req.user as PayloadToken;
    return this.usersService.update(payload.sub, body);
  }

  @Get('cart')
  @ApiOperation({ summary: 'Get you cart.   *JWT required*' })
  getMyCart(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return this.cartsService.getCartByUser(payload.sub);
  }

  @Post('cart')
  @ApiOperation({ summary: 'Add an item to your cart.   *JWT required*' })
  pushItemToMyCart(@Req() req: Request, @Body() body: CreateItemDTO) {
    const payload = req.user as PayloadToken;
    return this.cartsService.pushItem(payload.sub, body);
  }

  @Delete('cart/empty')
  @ApiOperation({ summary: 'Empty your cart.   *JWT required*' })
  emptyCartMyCart(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return this.cartsService.empty(payload.sub);
  }

  @Delete('cart/:id')
  @ApiOperation({ summary: 'Remove an item from your cart.   *JWT required*' })
  popItemToMyCart(@Req() req: Request, @Param('id', MongoIdPipe) postId: string) {
    const payload = req.user as PayloadToken;
    return this.cartsService.popItem(payload.sub, postId);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete your whole profile (includes owned cart, items and postings).   *JWT required*' })
  deleteMyProfile(@Req() req: Request) {
    const payload = req.user as PayloadToken;
    return this.usersService.delete(payload.sub);
  }
}

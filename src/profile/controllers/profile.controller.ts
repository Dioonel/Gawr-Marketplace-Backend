import { Controller, Get, UseGuards, Req, Redirect, UseFilters } from '@nestjs/common';
import { Request } from 'express';

import { PayloadToken } from './../../auth/models/token.model';
import { UsersService } from './../../users/services/users.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(ViewAuthFilter)
@Controller('my-profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Redirect('users/:id')
  @Get()
  getMyProfile(@Req() req: Request){
    const payload = req.user as PayloadToken;
    return { url: `/users/${payload.sub}` };                                                            // redirect URL
  }

  @Get('cart')
  getMyCart(@Req() req: Request){
    const payload = req.user as PayloadToken;
    return this.usersService.getCartByUserId(payload.sub);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CartsService } from './../services/carts.service';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';

@ApiTags('carts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService){}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: '*** Dev only, use my-profile routes instead ***' })
  getCarts(){                                                                         // dev only
    return this.cartsService.getAll();
  }
}

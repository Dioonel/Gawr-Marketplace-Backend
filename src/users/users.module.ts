import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersStoreService } from './services/users-store.service';
import { User, UserSchema } from './entities/user.entity';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartsController } from './controllers/carts.controller';
import { CartsService } from './services/carts.service';
import { CartsStoreService } from './services/carts-store.service';
import { ProductsModule } from './../products/products.module';
import { PostingsModule } from './../postings/postings.module';

@Module({
  imports: [
    ProductsModule,
    forwardRef(() => PostingsModule),
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name: Cart.name,
      schema: CartSchema
    }
  ])],
  controllers: [UsersController, CartsController],
  providers: [UsersService, UsersStoreService, CartsService, CartsStoreService],
  exports: [UsersService, CartsService],
})
export class UsersModule {}

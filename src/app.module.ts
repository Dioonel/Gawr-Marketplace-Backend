import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

import config from './config';

@Module({
  imports: [ProductsModule, UsersModule, DatabaseModule, ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, load: [config] }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

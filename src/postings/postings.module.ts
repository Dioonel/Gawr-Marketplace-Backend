import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './../users/users.module';
import { ProductsModule } from './../products/products.module';
import { PostingsController } from './controllers/postings.controller';
import { PostingsService } from './services/postings.service';
import { PostingsStoreService } from './services/postings-store.service';
import { Posting, PostingSchema } from './entities/posting.entity';

@Module({
  imports: [
    ProductsModule,
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Posting.name,
        schema: PostingSchema
      },
    ])
  ],
  controllers: [PostingsController],
  providers: [PostingsService, PostingsStoreService],
  exports: [PostingsService],
})
export class PostingsModule {}

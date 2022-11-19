import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './../users/users.module';
import { PostingsController } from './controllers/postings.controller';
import { PostingsService } from './services/postings.service';
import { PostingsStoreService } from './services/postings-store.service';
import { Posting, PostingSchema } from './entities/posting.entity';
import { Comment, CommentSchema } from './entities/comment.entity';
import { CommentsService } from './services/comments.service';
import { CommentsStoreService } from './services/comments-store.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Posting.name,
        schema: PostingSchema
      },
      {
        name: Comment.name,
        schema: CommentSchema
      },
    ])
  ],
  controllers: [PostingsController],
  providers: [PostingsService, PostingsStoreService, CommentsService, CommentsStoreService],
  exports: [PostingsService, CommentsService],
})
export class PostingsModule {}

import { Injectable, Inject, forwardRef, NotFoundException, ConflictException } from '@nestjs/common';

import { CommentsStoreService } from './comments-store.service';
import { PostingsService } from './postings.service';
import { rawCommentDTO, CreateCommentDTO} from './../dtos/comment.dto';
import { UsersService } from './../../users/services/users.service';

@Injectable()
export class CommentsService {
  constructor(
    private commentsStore: CommentsStoreService,
    @Inject(forwardRef(() => PostingsService))
    private postingsService: PostingsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    ) {}

  async create(postId: string, data: rawCommentDTO, userId: string) {
    const user = await this.usersService.getOne(userId);
    if(user){
      return await this.commentsStore.create({ user: userId, posting: postId, body: data.body });
    }
  }

  async delete(postId: string, commentId, userId: string) {
    const post = await this.postingsService.getOne(postId);
    const comment = post.comments.find(comment => comment._id.toString() === commentId);
    if(!comment){
      throw new NotFoundException("Comment not found.");
    }
    if(comment.user._id.toString() !== userId){
      throw new ConflictException("You are not the author of this comment.");
    }
    await await this.commentsStore.delete(commentId);
    return await this.postingsService.popComment(postId, commentId);
  }

  async forceDelete(id: string) {
    return await this.commentsStore.delete(id);
  }

  async deleteCommentsFromUser(userId: string) {
    const comments = await this.commentsStore.getCommentsByUser(userId);
    if(comments){
      await this.postingsService.popManyComments(comments);
      return await this.commentsStore.deleteCommentsFromUser(userId);
    }
    return 'No comments';
  }

  async deleteCommentsFromPosting(postingId: string) {
    return await this.commentsStore.deleteCommentsFromPosting(postingId);
  }
}

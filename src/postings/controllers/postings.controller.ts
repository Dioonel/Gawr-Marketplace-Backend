import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseFilters, Req } from '@nestjs/common';
import { Request } from 'express';

import { PostingsService } from './../services/postings.service';
import { CommentsService } from './../services/comments.service';
import { rawPostingDTO } from './../dtos/posting.dto';
import { rawCommentDTO } from './../dtos/comment.dto';
import { PayloadToken } from './../../auth/models/token.model';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';


@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(ViewAuthFilter)
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService, private commentsService: CommentsService) {};

  @Public()
  @Get()
  getPostings(){
    return this.postingsService.getAll();
  }

  @Public()
  @Get('/user/:id')
  getPostingsFromUser(@Param('id', MongoIdPipe) userId: string){
    return this.postingsService.getPostingsFromUser(userId);
  }

  @Public()
  @Get(':id')
  getOnePosting(@Param('id', MongoIdPipe) id: string){
    return this.postingsService.getOne(id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Post()
  createPosting(@Body() body: rawPostingDTO, @Req() req: Request){
    const { sub } = req.user as PayloadToken;
    return this.postingsService.create(body, sub);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id')
  deletePosting(@Param('id', MongoIdPipe) id: string, @Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.postingsService.delete(id, sub);
  }


////////////////////////////////////////////////////////// Comments //////////////////////////////////////////////////////////////

  @Roles(Role.USER, Role.ADMIN)
  @Post(':id')
  async createComment(@Body() body: rawCommentDTO, @Req() req: Request, @Param('id', MongoIdPipe) postId: string){
    const { sub } = req.user as PayloadToken;
    const comment = await this.commentsService.create(postId, body, sub);
    return this.postingsService.pushComment(postId, comment._id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':postId/:commentId')
  deleteComment(@Param('postId', MongoIdPipe) postId: string, @Param('commentId', MongoIdPipe) commentId: string, @Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.commentsService.delete(postId, commentId, sub);
  }
}

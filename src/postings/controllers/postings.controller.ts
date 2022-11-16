import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseFilters, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PostingsService } from './../services/postings.service';
import { CommentsService } from './../services/comments.service';
import { rawPostingDTO, FilterPostingDTO } from './../dtos/posting.dto';
import { rawCommentDTO } from './../dtos/comment.dto';
import { PayloadToken } from './../../auth/models/token.model';
import { MongoIdPipe } from './../../common/mongo-id/mongo-id.pipe';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Public } from './../../auth/decorators/public.decorator';
import { Roles } from './../../auth/decorators/roles.decorator';
import { Role } from './../../auth/models/roles.model';
import { ViewAuthFilter } from './../../auth/guards/exception.filter';

@ApiTags('postings')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(ViewAuthFilter)
@Controller('postings')
export class PostingsController {
  constructor(private postingsService: PostingsService, private commentsService: CommentsService) {};

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all postings.   *Public*' })
  getPostings(@Query() query: FilterPostingDTO){
    return this.postingsService.getAll(query);
  }

  @Public()
  @Get('/user/:id')
  @ApiOperation({ summary: 'Get all postings from user.   *Public*' })
  getPostingsFromUser(@Param('id', MongoIdPipe) userId: string){
    return this.postingsService.getPostingsFromUser(userId);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a detailed post.   *Public*' })
  getOnePosting(@Param('id', MongoIdPipe) id: string){
    return this.postingsService.getOne(id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new posting and product.   *JWT required* *USER role or higher required*' })
  createPosting(@Body() body: rawPostingDTO, @Req() req: Request){
    const { sub } = req.user as PayloadToken;
    return this.postingsService.create(body, sub);
  }

  @ApiOperation({ summary: 'Delete a posting and product (only if you are the author).   *JWT required* *USER role or higher required*' })
  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id')
  deletePosting(@Param('id', MongoIdPipe) id: string, @Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    console.log(sub, id);
    return this.postingsService.delete(id, sub);
  }


////////////////////////////////////////////////////////// Comments //////////////////////////////////////////////////////////////

  @Roles(Role.USER, Role.ADMIN)
  @Post(':id')
  @ApiOperation({ summary: 'Create a comment.   *JWT required* *USER role or higher required*' })
  async createComment(@Body() body: rawCommentDTO, @Req() req: Request, @Param('id', MongoIdPipe) postId: string){
    const { sub } = req.user as PayloadToken;
    const comment = await this.commentsService.create(postId, body, sub);
    return this.postingsService.pushComment(postId, comment._id);
  }

  @Roles(Role.USER, Role.ADMIN)
  @Delete(':postId/:commentId')
  @ApiOperation({ summary: 'Delete a comment (only if you are the author).   *JWT required* *USER role or higher required*' })
  deleteComment(@Param('postId', MongoIdPipe) postId: string, @Param('commentId', MongoIdPipe) commentId: string, @Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.commentsService.delete(postId, commentId, sub);
  }
}

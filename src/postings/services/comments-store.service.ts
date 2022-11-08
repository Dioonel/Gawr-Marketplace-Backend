import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCommentDTO } from './../dtos/comment.dto';
import { Comment } from './../entities/comment.entity';

@Injectable()
export class CommentsStoreService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async getCommentsByUser(userId: string){
    const comments = this.commentModel.find({ user: userId });
    if(!comments){
      return null;
    }
    return comments;
  }

  async create(data: CreateCommentDTO){
    const newComment = new this.commentModel(data);
    return await newComment.save();
  }

  async delete(id: string){
    const comment = await this.commentModel.findByIdAndDelete(id);
    if(!comment) {
      throw new NotFoundException("Comment not found.");
    }
    return true;
  }

  async deleteAllCommentsFromUser(userId: string){
    const data = await this.commentModel.deleteMany({ user: userId });
    if(!data) {
      return null;
    }
    return data;
  }
}
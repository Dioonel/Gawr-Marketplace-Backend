import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string){
    const user = await this.usersService.getByUsername(username);
    if(!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }
    const { password, ...res } = user.toJSON();
      return res;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user._id };                                                // add role later
    return {
      token: this.jwtService.sign(payload),
      user,
    }
  }
}

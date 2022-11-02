import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { Role } from './../models/roles.model';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;                                                                                // No roles required in that endpoint
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    const isAuth = roles.some(r => r === user.role);
    if(!isAuth) {
      throw new UnauthorizedException('Insufficient permissions');
    }
    return isAuth;
  }
}

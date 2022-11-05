import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
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
      return true;                                                                                // No roles required in this request
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    const isAuth = roles.some(r => r === user.role);
    if(!isAuth) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return isAuth;
  }
}

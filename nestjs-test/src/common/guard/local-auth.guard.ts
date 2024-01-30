import {
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isEmpty } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const body = request.body;
    const { userLogin, userPass } = body;

    if (isEmpty(userLogin) || isEmpty(userPass)) {
      throw new NotAcceptableException('账号或密码不能为空');
    }

    return super.canActivate(ctx);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

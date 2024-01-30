import { jwtConstant } from '@/constant';
import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(request: any, response: any, next: () => void) {
    Logger.debug(AuthMiddleware.name, `认证中间件`);

    const cookies = request?.cookies;
    const authorization = cookies ? cookies[jwtConstant.authKey] : null;
    if (!authorization) {
      response.redirect('/signin');
      throw new UnauthorizedException('认证失败，请先登录');
    }

    next();
  }
}

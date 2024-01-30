import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class blockUserMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (ctx.path === '/signout') {
        await next();
        return false;
      }

      if (ctx.user && ctx.user.is_block && ctx.method !== 'GET') {
        ctx.status = 403;
        ctx.body = '您已被管理员屏蔽了。有疑问请联系 @alsotang。';
        return false;
      }

      await next();
    };
  }

  static getName(): string {
    return 'block_user';
  }
}

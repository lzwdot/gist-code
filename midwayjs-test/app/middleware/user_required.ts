import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class userRequiredMiddleware
  implements IMiddleware<Context, NextFunction>
{
  /*
   * 需要登录
   */
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.user || !ctx.user._id) {
        ctx.status = 403;
        ctx.body = 'forbidden!';
        return;
      }
      await next();
    };
  }

  static getName(): string {
    return 'user_required';
  }
}

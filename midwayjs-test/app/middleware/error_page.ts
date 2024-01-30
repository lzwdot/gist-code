import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
@Middleware()
export class ErrorHandlerMiddleware
  implements IMiddleware<Context, NextFunction>
{
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      await next();
      const status = [404, 403];
      if (status.indexOf(ctx.status) > -1 && !ctx.body) {
        const { message } = ctx;
        // ctx.status = ctx.status;
        if (ctx.acceptJSON) {
          ctx.body = { error: 'Not Found' };
        } else {
          await ctx.render('notify/notify', { error: message });
        }
      }
    };
  }
  static getName(): string {
    return 'error_handler';
  }
}

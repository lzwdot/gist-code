import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class AdminRequiredMiddleware
  implements IMiddleware<Context, NextFunction>
{
  /*
   * 需要管理员权限
   */

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.user) {
        await ctx.render('notify/notify', { error: '你还没有登录。' });
        return false;
      }

      if (!ctx.user.is_admin) {
        await ctx.render('notify/notify', { error: '需要管理员权限。' });
        return false;
      }

      return await next();
    };
  }

  static getName(): string {
    return 'admin_required';
  }
}

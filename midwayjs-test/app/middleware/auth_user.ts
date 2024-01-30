import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class AuthUserMiddleware implements IMiddleware<Context, NextFunction> {
  // 验证用户是否登录
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // Ensure current_user always has defined.
      ctx.locals.current_user = null;
      // if (ctx.app.config.debug && ctx.cookies.get('mock_user')) {
      //   const mockUser = JSON.parse(ctx.cookies.get('mock_user'));
      //   ctx.user = new ctx.model.User(mockUser);
      //   if (mockUser.is_admin) {
      //     ctx.user.is_admin = true;
      //   }
      //   return await next();
      // }

      const { user } = ctx;

      if (!user) {
        return await next();
      }

      const count = await ctx.service.message.getMessagesCount(user._id);
      user.messages_count = count;
      ctx.locals.current_user = user;
      return await next();
    };
  }

  static getName(): string {
    return 'auth_user';
  }
}

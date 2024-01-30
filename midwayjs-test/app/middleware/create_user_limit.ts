import * as moment from 'moment';
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
@Middleware()
export class CreateUserLimitMiddleware
  implements IMiddleware<Context, NextFunction>
{
  private limit: any;
  constructor(limit: any) {
    this.limit = limit;
  }
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { service } = ctx;
      const realIP = ctx.ip;

      const YYYYMMDD = moment().format('YYYYMMDD');
      const key = `user_count_${realIP}_${YYYYMMDD}`;

      let count = (await service.cache.get(key)) || 0;
      if (count >= this.limit) {
        ctx.status = 403;
        ctx.body = {
          success: false,
          error_msg: '频率限制：当前操作每天可以进行 ' + this.limit + ' 次',
        };
        return;
      }

      await next();

      if (ctx.status === 302) {
        // 新建话题成功
        count += 1;
        await service.cache.incr(key, 60 * 60 * 24);
        ctx.set('X-RateLimit-Limit', this.limit);
        ctx.set('X-RateLimit-Remaining', `${this.limit - count}`);
      }
    };
  }

  static getName(): string {
    return 'create_user_limit';
  }
}

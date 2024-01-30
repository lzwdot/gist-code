import * as moment from 'moment';
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { CacheService } from '../service/cache';

@Middleware()
export class CreateTopicLimitMiddleware
  implements IMiddleware<Context, NextFunction>
{
  private perDayPerUserLimitCount: any;
  constructor(perDayPerUserLimitCount: any) {
    this.perDayPerUserLimitCount = perDayPerUserLimitCount;
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const { user } = ctx;
      const cacheService = await ctx.requestContext.getAsync<CacheService>(
        CacheService
      );
      const YYYYMMDD = moment().format('YYYYMMDD');
      const key = `topics_count_${user._id}_${YYYYMMDD}`;

      let todayTopicsCount: any = (await cacheService.get(key)) || 0;
      if (todayTopicsCount >= this.perDayPerUserLimitCount) {
        ctx.status = 403;
        await ctx.render('notify/notify', {
          error: `今天的话题发布数量已达到限制（${this.perDayPerUserLimitCount}）`,
        });
        return;
      }

      await next();

      if (ctx.status === 302) {
        // 新建话题成功
        todayTopicsCount += 1;
        await cacheService.incr(key, 60 * 60 * 24);
        ctx.set('X-RateLimit-Limit', this.perDayPerUserLimitCount);
        ctx.set(
          'X-RateLimit-Remaining',
          `${this.perDayPerUserLimitCount - todayTopicsCount}`
        );
      }
    };
  }

  static getName(): string {
    return 'create_topic_limit';
  }
}

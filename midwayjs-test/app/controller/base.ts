// import * as fs from 'fs';
import { ALL, Config, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Util } from '../util';

export class BaseController {
  @Inject()
  ctx: Context;

  @Config(ALL)
  config: any;

  async render(
    name: string,
    locals?: Record<string, any>,
    ...rest: undefined[]
  ) {
    const _locals = Object.assign(locals, {
      config: this.config,
      asset: Util.asset,
      current_user: undefined,
    });
    await this.ctx.render(name, _locals, ...rest);
  }
}

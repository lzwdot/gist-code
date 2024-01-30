import { Get, Inject, Config, ALL } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { SearchService } from '../service/search';

export class SearchController {
  @Config(ALL)
  config: any;

  @Inject()
  ctx: Context;

  @Inject()
  searchService: SearchService;

  @Get('/search')
  async index() {
    let q: any = this.ctx.query.q;
    if (this.config.search !== 'local') {
      q = encodeURIComponent(q);
    }
    if (q.length === 0) {
      return this.ctx.redirect('/');
    }

    switch (this.config.search) {
      case 'google':
        return this.ctx.redirect(
          `https://www.google.com.hk/#hl=zh-CN&q=site:cnodejs.org+${q}`
        );
      case 'baidu':
        return this.ctx.redirect(
          `https://www.baidu.com/s?wd=site:cnodejs.org+${q}`
        );
      case 'local':
        return await this.ctx.render(
          'search/index',
          await this.searchService.searchLocal(this.ctx.query, q)
        );
      default:
        return this.ctx.redirect('/');
    }
  }
}

import { Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

export class PageController {
  @Inject()
  ctx: Context;

  @Get('/about')
  async about() {
    await this.ctx.render('static/about', { pageTitle: '关于我们' });
  }

  // FAQ
  @Get('/faq')
  async faq() {
    await this.ctx.render('static/faq', { pageTitle: 'FAQ' });
  }

  @Get('/getstart')
  async getstart() {
    await this.ctx.render('static/getstart', { pageTitle: 'Node.js 新手入门' });
  }

  @Get('/robots.txt')
  async robots() {
    this.ctx.type = 'text';
    this.ctx.body = `
  # See http://www.robotstxt.org/robotstxt.html for documentation on how to use the robots.txt file
  #
  # To ban all spiders from the entire site uncomment the next two lines:
  # User-Agent: *
  # Disallow: /
`;
  }

  @Get('/api')
  async api() {
    await this.ctx.render('static/api', { pageTitle: 'API' });
  }
}

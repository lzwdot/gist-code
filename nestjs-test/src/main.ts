import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AuthMiddleware } from '@/common/middleware';
import { AllExceptionFilter, JwtAuthGuard } from './common';
import { ResponseInterceptor } from './common/interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 开启 cors
  });
  const configService = app.get(ConfigService);
  const blocks = {};

  // 全局验证
  app.useGlobalPipes(new ValidationPipe()); //管道
  // app.useGlobalFilters(new AllExceptionFilter()); // 过滤器
  // app.use(new AuthMiddleware().use); // 中间件
  // app.useGlobalGuards(new JwtAuthGuard()); // 守卫
  // app.useGlobalInterceptors(new ResponseInterceptor()); // 拦截器

  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);
  app.use(helmet()); // web 漏洞保护
  app.use(cookieParser()); // 开启 cookie
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
    }),
  ); // 限速保护

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });
  app.setBaseViewsDir(join(__dirname, '..', 'src/view'));

  // 使用 html 文件
  app.setViewEngine('html');
  app.engine('html', hbs.__express);

  // 使用 layout 和 partial 模板
  app.set('view options', { layout: 'layout.html' });
  hbs.registerPartials(join(__dirname, '..', 'src/view/partial'));
  hbs.registerHelper('extend', function (name, context) {
    let block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this)); 
  });
  hbs.registerHelper('block', function (name) {
    const val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  // 定义全局变量
  app.setLocal('name', configService.get('name'));

  await app.listen(3000);
}
bootstrap();

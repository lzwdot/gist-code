import { CACHE_MANAGER, Controller, Get, Inject, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  @Get()
  @Render('home/index')
  async getHello(): Promise<object> {
    await this.cacheManager.set('key', 'value');
    const value = await this.cacheManager.get('key');
    console.log(value);

    console.log(this.configService.get('database'));

    const message: string = this.homeService.getHello();
    return { message };
  }
}

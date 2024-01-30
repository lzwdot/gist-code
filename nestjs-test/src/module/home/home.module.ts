import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { CacheModule } from '@nestjs/common/cache';

@Module({
  imports: [CacheModule.register()],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

import { Dependencies, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, databaseConfig, githubConfig } from './config';
import { HomeModule } from './module/home/home.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { PostModule } from './module/post/post.module';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database.mysql');
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig, githubConfig],
    }),
    HomeModule,
    UserModule,
    AuthModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  dataSource: any;
  constructor(dataSource: any) {
    this.dataSource = dataSource;
  }
}

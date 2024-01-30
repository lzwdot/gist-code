import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, Postmeta } from '@/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@/common/middleware';
import { TermModule } from '../term/term.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Postmeta]), TermModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('post');
  }
}

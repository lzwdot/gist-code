import {
  Controller,
  Get,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '@/common';
import { TermService } from '../term';

// @UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService,
    private readonly termService: TermService,
  ) {}

  index() {}

  @Get('create')
  @Render('post/create')
  async create() {
    const category = await this.termService.findCategory();

    this.logger.debug('create', category);

    return {};
  }

  @Post('store')
  async store(@Body() createPostDto: CreatePostDto, @Request() request) {
    return this.postService.create(createPostDto, request.user);
  }

  show() {}

  edit() {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

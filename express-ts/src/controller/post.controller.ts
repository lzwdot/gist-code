import {
  Authorized,
  Body,
  Controller,
  Get,
  Params,
  Put,
  Redirect,
  Render,
  Req,
  Res,
} from 'routing-controllers';
import { Request, Response } from 'express';
import { PostService } from '../service/post.service';
import { JwtPayload } from 'jsonwebtoken';
import { ActionEnum, PostStatusEnum } from '../config/enum.config';
import { ForbiddenError } from '@casl/ability';
import { ReplyService } from '../service/reply.service';
import { PostStoreDto } from './dto/post-store.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { FileService } from '../service/file.service';
import { CryptoService } from '../service/crypto.service';
import { TermService } from '../service/term.service';
import { Term, Reply } from '../types/interface';
import { LoggerService } from '../service/logger.service';

const postService = new PostService();
const replyService = new ReplyService();
const fileService = new FileService();
const cryptoService = new CryptoService();
const termService = new TermService();
const loggerService = new LoggerService();
@Controller()
export class PostController {
  /**
   * list page
   */
  @Get('/post')
  @Render('post/index')
  async index() {
    const posts = await postService.list(1);
    return { ...posts };
  }

  /**
   * create page
   */
  @Get('/post/create')
  @Authorized()
  async create(@Req() req: Request, @Res() res: Response) {
    const payload: JwtPayload = req.user;
    const post = await postService.save({
      postStatus: PostStatusEnum.Draft,
      postAuthor: Number(payload.sub),
    });

    ForbiddenError.from(req.ability).throwUnlessCan(ActionEnum.Create, post);

    res.redirect(`/post/${post.postId}/edit`);
    return res;
  }

  /**
   * edit page
   */
  @Get('/post/:postId/edit')
  @Render('post/edit')
  @Authorized()
  async edit(@Req() req: Request) {
    const { postId } = req.params;
    const post = await postService.findOneBy(postId);

    ForbiddenError.from(req.ability).throwUnlessCan(ActionEnum.Update, post);

    const postTags = post.terms.map((item: Term) => item.termName).join(',');
    return { ...post, postTags };
  }

  /**
   * show page
   */
  @Get('/post/:postId')
  @Render('post/show')
  async show(@Req() req: Request, @Res() res: Response) {
    const { postId } = req.params;
    const post = await postService.findOneBy(postId);

    // view +1
    postService.increment(post, 'viewNum');

    const postTags = post.terms.map((item: Term) => item.termName).join(',');
    const replys = replyService.format(post.replys);

    return { ...post, postTags, replys };
  }

  /**
   * destroy data
   */
  async destroy(@Req() req: Request, @Res() res: Response) {
    const { postId } = req.params;
    const post = await postService.findOneBy(postId);

    ForbiddenError.from(req.ability).throwUnlessCan(ActionEnum.Delete, post);

    await postService.delete({ ...post });

    res.flash(`The post was successfully deleted`);
  }

  /**
   * update data
   */
  @Put('/post/:postId')
  @Redirect('/')
  @Authorized()
  async update(
    @Body() body: PostStoreDto,
    @Params() params: PostUpdateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { postId } = params;
    const { postText, postTags } = body;
    const post = await postService.findOneBy(postId);

    ForbiddenError.from(req.ability).throwUnlessCan(ActionEnum.Update, post);

    // set tags
    post.terms = await termService.tags(
      postTags ? JSON.parse(String(postTags)) : [],
    );

    await postService.save({ ...post, ...body, postId: Number(postId) });

    // delete unused images
    fileService.match(postText, `post/${cryptoService.md5(String(postId))}`);

    res.flash(`The post was successfully updated`);
  }
}

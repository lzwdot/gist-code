import {
  Authorized,
  Body,
  Controller,
  Params,
  Post,
  Req,
  Res,
} from 'routing-controllers';
import { Request, Response } from 'express';
import { ReplyService } from '../service/reply.service';
import { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../service/user.service';
import { ReplyStoreDto } from './dto/reply-store.dto';
import { ReplyUpdateDto } from './dto/reply-update.dto';

const replyService = new ReplyService();
const userService = new UserService();
@Controller()
export class ReplyController {
  /**
   * store data
   */
  @Post('/reply/:postId')
  @Authorized()
  async store(
    @Body() body: ReplyStoreDto,
    @Params() params: ReplyUpdateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { postId } = params;
    const { headers, ip } = req;
    const payload: JwtPayload = req.user;
    const user = await userService.findOneBy(payload.sub);

    await replyService.save({
      ...body,
      postId: Number(postId),
      userId: user.userId,
      replyUrl: user.userUrl,
      replyAuthor: user.userLogin,
      replyEmail: user.userEmail,
      replyAgent: headers['user-agent'] || '',
      replyIp: headers['x-forwarded-for']
        ? String(headers['x-forwarded-for'])
        : ip,
    });

    res.redirect(`/post/${postId}`);
    return res;
  }
}

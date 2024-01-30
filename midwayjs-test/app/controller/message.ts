import { Inject, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { MessageService } from '../service/message';

export class MessageController {
  @Inject()
  ctx: Context;

  @Inject()
  msgService: MessageService;

  // 用户个人的所有消息页
  @Get('/my/messages')
  async index() {
    const { ctx, msgService } = this;
    const userId = ctx.user._id;
    const [readMessageResults, unReadMessageResults] = await Promise.all([
      msgService.getReadMessagesByUserId(userId),
      msgService.getUnreadMessagesByUserId(userId),
    ]);
    const hasReadMessages = await Promise.all(
      readMessageResults.map(
        async message => await msgService.getMessageRelations(message)
      )
    );
    const hasUnReadMessages = await Promise.all(
      unReadMessageResults.map(
        async message => await msgService.getMessageRelations(message)
      )
    );

    // 把未读消息全部设置成已读
    await msgService.updateMessagesToRead(userId, unReadMessageResults);
    await ctx.render('message/index.html', {
      has_read_messages: hasReadMessages,
      hasnot_read_messages: hasUnReadMessages,
    });
  }
}

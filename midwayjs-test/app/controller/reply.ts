import { Get, Inject, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { TopicService } from '../service/topic';
import { UserService } from '../service/user';
import { ReplyService } from '../service/reply';
import { AtService } from '../service/at';
import { MessageService } from '../service/message';

export class ReplyController {
  @Inject()
  ctx: Context;

  @Inject()
  topicService: TopicService;

  @Inject()
  userService: UserService;

  @Inject()
  replyService: ReplyService;

  @Inject()
  atService: AtService;

  @Inject()
  msgService: MessageService;

  /**
   * 添加回复
   */
  @Post('/:topic_id/reply')
  async add() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const content = reqBody.r_content;
    const reply_id = reqBody.reply_id;

    if (content.trim() === '') {
      ctx.status = 422;
      ctx.body = {
        error: '回复内容不能为空!',
      };
      return;
    }

    const topic_id = ctx.params.topic_id;
    let topic: any = await this.topicService.getTopicById(topic_id);
    topic = topic.topic;

    if (!topic) {
      ctx.status = 404;
      ctx.message = '这个主题不存在。';
      return;
    }
    if (topic.lock) {
      ctx.status = 403;
      ctx.body = {
        error: '该主题已锁定',
      };
      return;
    }

    const user_id = ctx.user._id;
    const topicAuthor = await this.userService.getUserById(topic.author_id);
    const newContent = content.replace('@' + topicAuthor.loginname + ' ', '');
    const reply = await this.replyService.newAndSave(
      content,
      topic_id,
      user_id,
      reply_id
    );

    await Promise.all([
      this.userService.incrementScoreAndReplyCount(user_id, 5, 1),
      this.topicService.updateLastReply(topic_id, reply._id),
    ]);

    await this.atService.sendMessageToMentionUsers(
      newContent,
      topic_id,
      user_id,
      reply._id
    );
    if (topic.author_id.toString() !== user_id.toString()) {
      await this.msgService.sendReplyMessage(
        topic.author_id,
        user_id,
        topic._id,
        reply._id
      );
    }

    ctx.redirect('/topic/' + topic_id + '#' + reply._id);
  }
  /**
   * 打开回复编辑器
   */
  @Get('/reply/:reply_id/edit')
  async showEdit() {
    const { ctx } = this;
    const reply_id = ctx.params.reply_id;
    const reply = await this.replyService.getReplyById(reply_id);

    if (!reply) {
      ctx.status = 404;
      ctx.message = '此回复不存在或已被删除。';
      return;
    }
    if (
      ctx.user._id.toString() === reply.author_id.toString() ||
      ctx.user.is_admin
    ) {
      await ctx.render('reply/edit', {
        reply_id: reply._id,
        content: reply.content,
      });
      return;
    }
    ctx.status = 403;
    ctx.body = {
      error: '对不起，你不能编辑此回复',
    };
    return;
  }
  /**
   * 提交编辑回复
   */
  @Post('/reply/:reply_id/edit')
  async update() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const reply_id = ctx.params.reply_id;
    const content = reqBody.t_content;
    const reply = await this.replyService.getReplyById(reply_id);

    if (!reply) {
      ctx.status = 404;
      ctx.message = '此回复不存在或已被删除。';
      return;
    }
    if (
      ctx.user._id.toString() === reply.author_id.toString() ||
      ctx.user.is_admin
    ) {
      if (content.trim() !== '') {
        reply.content = content;
        reply.update_at = new Date();
        await reply.save();
        ctx.redirect('/topic/' + reply.topic_id + '#' + reply._id);
        return;
      }
      ctx.status = 400;
      ctx.body = {
        error: '回复的字数太少。',
      };
      return;
    }
    ctx.status = 403;
    ctx.body = {
      error: '对不起，你不能编辑此回复',
    };
    return;
  }
  /**
   * 删除回复
   */
  @Post('/reply/:reply_id/delete')
  async delete() {
    const { ctx } = this;
    const reply_id = ctx.params.reply_id;
    const reply = await this.replyService.getReplyById(reply_id);

    if (!reply) {
      ctx.status = 422;
      ctx.body = { status: 'no reply ' + reply_id + ' exists' };
      return;
    }
    if (
      reply.author_id.toString() === ctx.user._id.toString() ||
      ctx.user.is_admin
    ) {
      reply.deleted = true;
      reply.save();
      ctx.status = 200;
      ctx.body = { status: 'success' };
      reply.author.score -= 5;
      reply.author.reply_count -= 1;
      reply.author.save();
    } else {
      ctx.status = 200;
      ctx.body = { status: 'failed' };
    }
    await this.topicService.reduceCount(reply.topic_id);
    return;
  }
  /**
   * 回复点赞
   */
  @Post('/reply/:reply_id/up')
  async up() {
    const { ctx } = this;
    const reply_id = ctx.params.reply_id;
    const user_id = ctx.user._id;
    const reply = await this.replyService.getReplyById(reply_id);

    if (!reply) {
      ctx.status = 404;
      ctx.message = '此回复不存在或已被删除。';
      return;
    }
    if (reply.author_id.toString() === user_id.toString()) {
      ctx.body = {
        success: false,
        message: '呵呵，不能帮自己点赞。',
      };
      return;
    }
    let action;
    reply.ups = reply.ups || [];
    const upIndex = reply.ups.indexOf(user_id);
    if (upIndex === -1) {
      reply.ups.push(user_id);
      action = 'up';
    } else {
      reply.ups.splice(upIndex, 1);
      action = 'down';
    }
    await reply.save();
    ctx.body = {
      success: true,
      action,
    };
  }
}

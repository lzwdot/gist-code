import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Message } from '../model/message';
import { UserService } from './user';
import { TopicService } from './topic';
import { ReplyService } from './reply';

/*
 * type:
 * reply: xx 回复了你的话题
 * reply2: xx 在话题中回复了你
 * follow: xx 关注了你
 * at: xx ＠了你
 */

@Provide()
export class MessageService {
  @InjectEntityModel(Message)
  msgModel: ReturnModelType<typeof Message>;

  @Inject()
  userService: UserService;

  @Inject()
  topicService: TopicService;

  @Inject()
  replyService: ReplyService;

  /*
   * 根据用户ID，获取未读消息的数量
   * Callback:
   * @param {String} id 用户ID
   * @return {Promise[messagesCount]} 承载消息列表的 Promise 对象
   */
  getMessagesCount(id: string) {
    return this.msgModel
      .count({
        master_id: id,
        has_read: false,
      })
      .exec();
  }

  async getMessageRelations(message: any) {
    if (
      message.type === 'reply' ||
      message.type === 'reply2' ||
      message.type === 'at'
    ) {
      const [author, topic, reply] = await Promise.all([
        this.userService.getUserById(message.author_id),
        this.topicService.getTopicById(message.topic_id),
        this.replyService.getReplyById(message.reply_id),
      ]);

      message.author = author;
      message.topic = topic;
      message.reply = reply;

      if (!author || !topic) {
        message.is_invalid = true;
      }

      return message;
    }

    return { is_invalid: true };
  }

  /*
   * 根据消息Id获取消息
   * @param {String} id 消息ID
   * @return {Promise[message]} 承载消息的 Promise 对象
   */
  async getMessageById(id: any) {
    const message = await this.msgModel.findOne({ _id: id }).exec();
    return this.getMessageRelations(message);
  }

  /*
   * 根据用户ID，获取已读消息列表
   * @param {String} userId 用户ID
   * @return {Promise[messages]} 承载消息列表的 Promise 对象
   */
  getReadMessagesByUserId(userId: any) {
    const query = { master_id: userId, has_read: true };
    return this.msgModel
      .find(query, null, {
        sort: '-create_at',
        limit: 20,
      })
      .exec();
  }

  /*
   * 根据用户ID，获取未读消息列表
   * @param {String} userId 用户ID
   * @return {Promise[messages]} 承载消息列表的 Promise 对象
   */
  getUnreadMessagesByUserId(userId: any) {
    const query = { master_id: userId, has_read: false };
    return this.msgModel
      .find(query, null, {
        sort: '-create_at',
      })
      .exec();
  }

  /*
   * 将消息设置成已读
   * @return {Promise[messages]} 承载消息列表的 Promise 对象
   */
  async updateMessagesToRead(userId: any, messages: any[]) {
    if (messages.length === 0) {
      return;
    }

    const ids = messages.map((m: { id: any }) => {
      return m.id;
    });

    const query = { master_id: userId, _id: { $in: ids } };
    const update = { $set: { has_read: true } };
    const opts = { multi: true };
    return this.msgModel.update(query, update, opts).exec();
  }

  /**
   * 将单个消息设置成已读
   * @param {String} msgId 消息 ID
   * @return {Promise} 更新消息返回的 Promise 对象
   */
  async updateOneMessageToRead(msgId: any) {
    if (!msgId) {
      return;
    }
    const query = { _id: msgId };
    const update = { $set: { has_read: true } };
    return this.msgModel.update(query, update, { multi: true }).exec();
  }

  async sendAtMessage(userId: any, authorId: any, topicId: any, replyId: any) {
    const message: any = this.msgModel;

    message.type = 'at';
    message.master_id = userId;
    message.author_id = authorId;
    message.topic_id = topicId;
    message.reply_id = replyId;

    return message.save();
  }

  async sendReplyMessage(
    userId: any,
    authorId: any,
    topicId: any,
    replyId: any
  ) {
    const message: any = this.msgModel;

    message.type = 'reply';
    message.master_id = userId;
    message.author_id = authorId;
    message.topic_id = topicId;
    message.reply_id = replyId;

    return message.save();
  }
}

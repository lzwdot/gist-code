import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType, mongoose } from '@typegoose/typegoose';
import { AtService } from './at';
import { UserService } from './user';
import { Reply } from '../model/reply';
import { User } from '../model/user';

@Provide()
export class ReplyService {
  @InjectEntityModel(Reply)
  replyModel: ReturnModelType<typeof Reply>;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Inject()
  atService: AtService;

  @Inject()
  userService: UserService;

  /*
   * 获取一条回复信息
   * @param {String} id 回复ID
   * @param {Function} callback 回调函数
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
  getReply(id: any) {
    return this.replyModel.findOne({ _id: id }).exec();
  }

  /*
   * 根据回复ID，获取回复
   * @param {String} id 回复ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
  async getReplyById(id: any) {
    if (!id) {
      return null;
    }

    const reply: any = await this.replyModel.findOne({ _id: id }).exec();

    if (!reply) {
      return null;
    }

    const author_id = reply.author_id;
    const author = await this.userService.getUserById(author_id);

    reply.author = author;
    // TODO: 添加更新方法，有些旧帖子可以转换为markdown格式的内容
    if (reply.content_is_html) {
      return reply;
    }

    const str = this.atService.linkUsers(reply.content);
    reply.content = str;
    return reply;
  }

  /*
   * 根据主题ID，获取回复列表
   * Callback:
   * - err, 数据库异常
   * - replies, 回复列表
   * @param {String} id 主题ID
   * @return {Promise[replies]} 承载 replay 列表的 Promise 对象
   */
  async getRepliesByTopicId(id: any) {
    const query = { topic_id: id, deleted: false };
    let replies = await this.replyModel
      .find(query, '', {
        sort: 'create_at',
      })
      .exec();

    if (replies.length === 0) {
      return [];
    }

    replies = replies.filter(item => {
      return !item.content_is_html;
    });

    return Promise.all(
      replies.map(async (item: any) => {
        const author = await this.userService.getUserById(item.author_id);
        item.author = author || { _id: '' };

        item.content = await this.atService.linkUsers(item.content);
        return item;
      })
    );
  }

  /*
   * 创建并保存一条回复信息
   * @param {String} content 回复内容
   * @param {String} topicId 主题ID
   * @param {String} authorId 回复作者
   * @param {String} [replyId] 回复ID，当二级回复时设定该值
   * @return {Promise} 承载 replay 列表的 Promise 对象
   */
  async newAndSave(
    content: string,
    topicId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
    replyId = null
  ) {
    const reply: any = this.replyModel;
    reply.content = content;
    reply.topic_id = topicId;
    reply.author_id = authorId;

    if (replyId) {
      reply.reply_id = replyId;
    }

    await reply.save();

    return reply;
  }

  /*
   * 根据topicId查询到最新的一条未删除回复
   * @param topicId 主题ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
  getLastReplyByTopId(topicId: any) {
    const query = { topic_id: topicId, deleted: false };
    const opts = { sort: { create_at: -1 }, limit: 1 };
    return this.replyModel.findOne(query, '_id', opts).exec();
  }

  getRepliesByAuthorId(authorId: any, opt = null) {
    return this.replyModel.find({ author_id: authorId }, {}, opt).exec();
  }

  // 通过 author_id 获取回复总数
  getCountByAuthorId(authorId: any) {
    return this.replyModel.count({ author_id: authorId }).exec();
  }
}

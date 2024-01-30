import _ = require('lodash');
const path = require('path');
const fs = require('fs');
import { v1 as uuidv1 } from 'uuid';
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

import { Get, Inject, Config, ALL, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';
import { CacheService } from '../service/cache';
import { TopicService } from '../service/topic';
import { TopicCollectService } from '../service/topic_collect';
import { AtService } from '../service/at';

export class TopicController {
  @Config(ALL)
  config: any;

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  cacheService: CacheService;

  @Inject()
  topicService: TopicService;

  @Inject()
  topicColService: TopicCollectService;

  @Inject()
  atService: AtService;

  /**
   * Topic page
   */
  @Get('/topic/:tid')
  async index() {
    function isUped(user, reply) {
      if (!reply.ups) {
        return false;
      }
      return reply.ups.indexOf(user._id) !== -1;
    }
    const { ctx } = this;
    const topic_id = ctx.params.tid;
    const currentUser = ctx.user;

    if (topic_id.length !== 24) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }

    const [topic, author, replies] = await this.topicService.getFullTopic(
      topic_id
    );

    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }

    // 增加 visit_count
    topic.visit_count += 1;
    // 写入 DB
    await this.topicService.incrementVisitCount(topic_id);

    topic.author = author;
    topic.replies = replies;
    // 点赞数排名第三的回答，它的点赞数就是阈值
    topic.reply_up_threshold = (() => {
      let allUpCount = replies.map(reply => {
        return (reply.ups && reply.ups.length) || 0;
      });
      allUpCount = _.sortBy(allUpCount, Number).reverse();

      let threshold = allUpCount[2] || 0;
      if (threshold < 3) {
        threshold = 3;
      }
      return threshold;
    })();

    const options = { limit: 5, sort: '-last_reply_at' };
    const query = { author_id: topic.author_id, _id: { $nin: [topic._id] } };
    const other_topics = await this.topicService.getTopicsByQuery(
      query,
      options
    );

    // get no_reply_topics
    let no_reply_topics = await this.cacheService.get('no_reply_topics');
    if (!no_reply_topics) {
      const query = { reply_count: 0, tab: { $nin: ['job', 'dev'] } };
      const options = { limit: 5, sort: '-create_at' };
      no_reply_topics = await this.topicService.getTopicsByQuery(
        query,
        options
      );
      await this.cacheService.setex('no_reply_topics', no_reply_topics, 60 * 1);
    }

    let is_collect;
    if (!currentUser) {
      is_collect = null;
    } else {
      is_collect = await this.topicColService.getTopicCollect(
        currentUser._id,
        topic_id
      );
    }

    await ctx.render('topic/index', {
      topic,
      author_other_topics: other_topics,
      no_reply_topics,
      is_uped: isUped,
      is_collect,
    });
  }

  /**
   * 进入创建主题页面
   */
  @Get('/topic/create')
  async create() {
    const { ctx, config } = this;
    await ctx.render('topic/edit', {
      tabs: config.tabs,
    });
  }

  /**
   * 发表主题帖
   */
  @Post('/topic/create')
  async put() {
    const { ctx } = this;
    const { tabs } = this.config;
    const reqBody: any = ctx.request.body;

    // 得到所有的 tab, e.g. ['ask', 'share', ..]
    const allTabs = tabs.map(tPair => tPair[0]);

    // 使用 egg_validate 验证
    // TODO: 此处可以优化，将所有使用egg_validate的rules集中管理，避免即时新建对象
    const RULE_CREATE = {
      title: {
        type: 'string',
        max: 100,
        min: 5,
      },
      content: {
        type: 'string',
      },
      tab: {
        type: 'enum',
        values: allTabs,
      },
    };
    ctx.validate(RULE_CREATE, ctx.request.body);

    // 储存新主题帖
    const topic = await this.topicService.newAndSave(
      reqBody.title,
      reqBody.content,
      reqBody.tab,
      reqBody.user._id
    );

    // 发帖用户增加积分,增加发表主题数量
    await this.userService.incrementScoreAndReplyCount(topic.author_id, 5, 1);

    // 通知被@的用户
    await this.atService.sendMessageToMentionUsers(
      reqBody.content,
      topic._id,
      ctx.user._id
    );

    ctx.redirect('/topic/' + topic._id);
  }

  /**
   * 显示编辑页面
   */
  @Get('/topic/:tid/edit')
  async showEdit() {
    const { ctx, config } = this;
    const topic_id = ctx.params.tid;

    const { topic } = await this.topicService.getTopicById(topic_id);

    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }

    if (String(topic.author_id) === String(ctx.user._id) || ctx.user.is_admin) {
      await ctx.render('topic/edit', {
        action: 'edit',
        topic_id: topic._id,
        title: topic.title,
        content: topic.content,
        tab: topic.tab,
        tabs: config.tabs,
      });
    } else {
      ctx.status = 403;
      ctx.message = '对不起，你不能编辑此话题';
    }
  }

  /**
   * 更新主题帖
   */
  @Post('/topic/:tid/edit')
  async update() {
    const { ctx, config } = this;

    const topic_id = ctx.params.tid;
    const reqBody: any = ctx.request.body;
    let { title, tab, content } = reqBody;

    const { topic } = await this.topicService.getTopicById(topic_id);
    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }

    if (
      topic.author_id.toString() === ctx.user._id.toString() ||
      ctx.user.is_admin
    ) {
      title = title.trim();
      tab = tab.trim();
      content = content.trim();

      // 验证
      let editError;
      if (title === '') {
        editError = '标题不能是空的。';
      } else if (title.length < 5 || title.length > 100) {
        editError = '标题字数太多或太少。';
      } else if (!tab) {
        editError = '必须选择一个版块。';
      } else if (content === '') {
        editError = '内容不可为空。';
      }
      // END 验证

      if (editError) {
        await ctx.render('topic/edit', {
          action: 'edit',
          edit_error: editError,
          topic_id: topic._id,
          content,
          tabs: config.tabs,
        });
        return;
      }

      // 保存话题
      topic.title = title;
      topic.content = content;
      topic.tab = tab;
      topic.update_at = new Date();

      await topic.save();

      await this.atService.sendMessageToMentionUsers(
        content,
        topic._id,
        ctx.user._id
      );

      ctx.redirect('/topic/' + topic._id);
    } else {
      ctx.status = 403;
      ctx.message = '对不起，你不能编辑此话题。';
    }
  }

  /**
   * 删除主题帖
   */
  @Post('/topic/:tid/delete')
  async delete() {
    // 删除话题, 话题作者topic_count减1
    // 删除回复，回复作者reply_count减1
    // 删除topic_collect，用户collect_topic_count减1
    const { ctx } = this;
    const topic_id = ctx.params.tid;

    const [topic, author] = await this.topicService.getFullTopic(topic_id);

    if (!topic) {
      ctx.status = 422;
      ctx.body = { message: '此话题不存在或已被删除。', success: false };
      return;
    }

    if (!ctx.user.is_admin && !topic.author_id.equals(ctx.user._id)) {
      ctx.status = 403;
      ctx.body = { message: '无权限', success: false };
      return;
    }

    author.score -= 5;
    author.topic_count -= 1;
    await author.save();

    topic.deleted = true;

    await topic.save();

    ctx.body = { message: '话题已被删除。', success: true };
  }

  /**
   * 设为置顶
   */
  @Post('/topic/:tid/top')
  async top() {
    const { ctx } = this;
    const topic_id = ctx.params.tid;
    const referer = ctx.get('referer');

    const topic = await this.topicService.getTopic(topic_id);

    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }
    topic.top = !topic.top;
    await topic.save();
    const msg = topic.top ? '此话题已置顶。' : '此话题已取消置顶。';
    await ctx.render('notify/notify', { success: msg, referer });
  }

  /**
   * 设为精华
   */
  @Post('/topic/:tid/good')
  async good() {
    const { ctx } = this;
    const topic_id = ctx.params.tid;
    const referer = ctx.get('referer');

    const topic = await this.topicService.getTopic(topic_id);
    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }
    topic.good = !topic.good;
    await topic.save();
    const msg = topic.good ? '此话题已加精。' : '此话题已取消加精。';
    await ctx.render('notify/notify', { success: msg, referer });
  }

  /**
   * 锁定帖子,不能回复
   */
  @Post('/topic/:tid/lock')
  async lock() {
    const { ctx } = this;
    const topic_id = ctx.params.tid;
    const referer = ctx.get('referer');

    const topic = await this.topicService.getTopic(topic_id);
    if (!topic) {
      ctx.status = 404;
      ctx.message = '此话题不存在或已被删除。';
      return;
    }
    topic.lock = !topic.lock;
    await topic.save();
    const msg = topic.lock ? '此话题已锁定。' : '此话题已取消锁定。';
    await ctx.render('notify/notify', { success: msg, referer });
  }

  /**
   * 收藏主题帖
   */
  @Post('/topic/collect')
  async collect() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const topic_id = reqBody.topic_id;

    const topic = await this.topicService.getTopic(topic_id);

    if (!topic) {
      ctx.body = { status: 'failed' };
      return;
    }

    const doc = await this.topicColService.getTopicCollect(
      ctx.user._id,
      topic._id
    );

    if (doc) {
      ctx.body = { status: 'failed' };
      return;
    }

    await this.topicColService.newAndSave(ctx.user._id, topic._id);
    ctx.body = { status: 'success' };

    await Promise.all([
      this.userService.incrementCollectTopicCount(ctx.user._id),
      this.topicService.incrementCollectCount(topic_id),
    ]);
  }

  /**
   * 取消收藏主题帖
   */
  @Post('/topic/de_collect')
  async de_collect() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const topic_id = reqBody.topic_id;
    const topic = await this.topicService.getTopic(topic_id);

    if (!topic) {
      ctx.body = { status: 'failed' };
      return;
    }

    const removeResult = await this.topicColService.remove(
      ctx.user._id,
      topic._id
    );

    if (removeResult.result.n === 0) {
      ctx.body = { status: 'failed' };
      return;
    }

    const user = await this.userService.getUserById(ctx.user._id);

    user.collect_topic_count -= 1;
    // ctx.user = user;
    await user.save();

    topic.collect_count -= 1;
    await topic.save();

    ctx.body = { status: 'success' };
  }

  /**
   * 上传
   */
  @Post('/upload')
  async upload() {
    const { ctx, config } = this;
    const uid = uuidv1();
    const stream = await ctx.getFileStream();
    const filename = uid + path.extname(stream.filename).toLowerCase();

    // 如果有七牛云的配置,优先上传七牛云
    if (config.qn_access && config.qn_access.secretKey !== 'your secret key') {
      try {
        const result = await this.topicService.qnUpload(stream, filename);
        ctx.body = {
          success: true,
          url: config.qn_access.origin + '/' + result.key,
        };
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
    } else {
      const target = path.join(config.upload.path, filename);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
        ctx.body = {
          success: true,
          url: config.upload.url + filename,
        };
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
    }
  }
}

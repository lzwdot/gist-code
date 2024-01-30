import { Provide, Inject, Config, ALL, Init } from '@midwayjs/decorator';
import { UserService } from './user';
import { TopicService } from './topic';

@Provide()
export class SearchService {
  protected limit: any;

  @Inject()
  userService: UserService;

  @Inject()
  topicService: TopicService;

  @Config(ALL)
  config: any;

  @Init()
  async init() {
    this.limit = this.config.list_topic_count;
  }

  /*
   * 根据关键字查询本地数据库
   */
  async searchLocal(query: { page?: any; tab?: any }, keyword: string) {
    const { tab } = query;
    const page = parseInt(query.page) || 1;
    let users = [];
    let topics = [];
    let data = [];
    let count = this.limit;

    switch (tab) {
      case 'user':
        [data, count] = await this.searchUser(keyword, page);
        break;
      case 'topic':
        [data, count] = await this.searchTopic(keyword, page);
        break;
      default:
        [users, topics] = await this.searchUserAndTopic(keyword, page);
    }

    const pages = Math.ceil(count / this.limit);
    return {
      keyword,
      data,
      users,
      topics,
      current_page: parseInt(query.page) || 1,
      tab,
      pages,
      base: '/search?q=' + keyword,
    };
  }

  queryFactory(keyword: string | RegExp, searchKey: string, page: number) {
    const opt = {
      skip: (page - 1) * this.limit,
      limit: this.limit,
      sort: '-create_at',
    };
    return [{ [searchKey]: { $regex: new RegExp(keyword, 'i') } }, opt];
  }

  /*
   * 根据关键字查找用户列表
   * @param {String} keyword 关键字, {Number} page 第几页
   * @return {Promise[data, count]} 承载用户列表, 查询总数的 Promise 对象
   */
  searchUser(keyword: any, page: number) {
    const searchQuery: any = this.queryFactory(keyword, 'name', page);
    const { query, opt } = searchQuery;
    return Promise.all([
      this.userService.getUsersByQuery(query, opt),
      this.userService.getCountByQuery(query),
    ]);
  }

  /*
   * 根据关键字查找帖子列表
   * @param {String} keyword 关键字, {Number} page 第几页
   * @return {Promise[data, count]} 承载帖子列表, 查询总数的 Promise 对象
   */
  searchTopic(keyword: any, page: number) {
    const searchQuery: any = this.queryFactory(keyword, 'title', page);
    const { query, opt } = searchQuery;
    return Promise.all([
      this.topicService.getTopicsByQuery(query, opt),
      this.topicService.getCountByQuery(query),
    ]);
  }

  /*
   * 根据关键字查找用户和帖子列表
   * @param {String} keyword 关键字, {Number} page 第几页
   * @return {Promise[data, count]} 承载用户列表, 帖子列表的 Promise 对象
   */
  searchUserAndTopic(keyword: any, page: number) {
    const userQuery: any = this.queryFactory(keyword, 'name', page);
    const topicQuery: any = this.queryFactory(keyword, 'title', page);
    return Promise.all([
      this.userService.getUsersByQuery(userQuery.query, userQuery.opt),
      this.topicService.getTopicsByQuery(topicQuery.query, topicQuery.opt),
    ]);
  }
}

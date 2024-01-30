import * as utility from 'utility';
import * as uuid from 'uuid';
import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../model/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  /*
   * 根据用户名列表查找用户列表
   * @param {Array} names 用户名列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  async getUsersByNames(names: string | any[]) {
    if (names.length === 0) {
      return [];
    }

    const query = { loginname: { $in: names } };
    return this.userModel.find(query).exec();
  }

  /*
   * 根据登录名查找用户
   * @param {String} loginName 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByLoginName(loginName: string) {
    const query = { loginname: new RegExp('^' + loginName + '$', 'i') };
    return this.userModel.findOne(query).exec();
  }

  /*
   * 根据 githubId 查找用户
   * @param {String} githubId 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByGithubId(githubId: any) {
    const query = { githubId };
    return this.userModel.findOne(query).exec();
  }

  /*
   * 根据 token 查找用户
   * @param {String} token
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByToken(accessToken: any) {
    const query = { accessToken };
    return this.userModel.findOne(query).exec();
  }

  /*
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  async getUserById(id: any) {
    if (!id) {
      return null;
    }

    return this.userModel.findOne({ _id: id }).exec();
  }

  /*
   * 根据邮箱，查找用户
   * @param {String} email 邮箱地址
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByMail(email: any) {
    return this.userModel.findOne({ email }).exec();
  }

  /*
   * 根据用户ID列表，获取一组用户
   * @param {Array} ids 用户ID列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  getUsersByIds(ids: any) {
    return this.userModel.find({ _id: { $in: ids } }).exec();
  }

  /*
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  getUsersByQuery(
    query:
      | { skip: number; limit: any; sort: string }
      | { [x: string]: { $regex: RegExp } }
      | any,
    opt: undefined | any
  ) {
    return this.userModel.find(query, '', opt).exec();
  }

  /*
   * 获取关键词能搜索到的用户数量
   * @param {String} query 搜索关键词
   */
  getCountByQuery(
    query:
      | { skip: number; limit: any; sort: string }
      | { [x: string]: { $regex: RegExp } }
  ) {
    return this.userModel.count(query).exec();
  }

  /*
   * 根据查询条件，获取一个用户
   * @param {String} name 用户名
   * @param {String} key 激活码
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
  getUserByNameAndKey(loginname: any, key: any) {
    const query = { loginname, retrieve_key: key };
    return this.userModel.findOne(query).exec();
  }

  incrementScoreAndReplyCount(id: any, score: any, replyCount: any) {
    const query = { _id: id };
    const update = { $inc: { score, reply_count: replyCount } };
    return this.userModel.findByIdAndUpdate(query, update).exec();
  }

  incrementCollectTopicCount(id: any) {
    const query = { _id: id };
    const update = { $inc: { collect_topic_count: 1 } };
    return this.userModel.findByIdAndUpdate(query, update).exec();
  }

  newAndSave(
    name: any,
    loginname: any,
    pass: any,
    email: any,
    avatar_url: any,
    active: boolean
  ) {
    const user: any = this.userModel;
    user.name = loginname;
    user.loginname = loginname;
    user.pass = pass;
    user.email = email;
    user.avatar = avatar_url;
    user.active = active || false;
    user.accessToken = uuid.v4();

    return user.save();
  }

  makeGravatar(email: string) {
    return (
      'http://www.gravatar.com/avatar/' +
      utility.md5(email.toLowerCase()) +
      '?size=48'
    );
  }

  getGravatar(user: { avatar: any; email: any }) {
    return user.avatar || this.makeGravatar(user.email);
  }
}

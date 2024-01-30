import { prop, index, pre } from '@typegoose/typegoose';
import * as utility from 'utility';

@index({ loginname: 1 }, { unique: true })
@index({ email: 1 }, { unique: true })
@index({ score: -1 })
@index({ githubId: 1 })
@index({ accessToken: 1 })
@pre<User>('save', function () {
  const now = new Date();
  this.update_at = now;
})
export class User {
  @prop()
  public name?: string;

  @prop()
  public loginname?: string;

  @prop()
  public pass?: string;

  @prop()
  public email?: string;

  @prop()
  public url?: string;

  @prop()
  public profile_image_url?: string;

  @prop()
  public location?: string;

  @prop()
  public signature?: string;

  @prop()
  public profile?: string;

  @prop()
  public weibo?: string;

  @prop()
  public avatar?: string;

  @prop()
  public githubId?: string;

  @prop()
  public githubUsername?: string;

  @prop()
  public githubAccessToken?: string;

  @prop({ default: false })
  public is_block?: boolean;

  @prop({ default: 0 })
  public score?: number;

  @prop({ default: 0 })
  public topic_count?: number;

  @prop({ default: 0 })
  public reply_count?: number;

  @prop({ default: 0 })
  public follower_count?: number;

  @prop({ default: 0 })
  public following_count?: number;

  @prop({ default: 0 })
  public collect_tag_count?: number;

  @prop({ default: 0 })
  public collect_topic_count?: number;

  @prop({ default: Date.now })
  public create_at?: Date;

  @prop({ default: Date.now })
  public update_at?: Date;

  @prop()
  public is_star?: boolean;

  @prop()
  public level?: string;

  @prop({ default: false })
  public active?: boolean;

  @prop({ default: false })
  public receive_reply_mail?: boolean;

  @prop({ default: false })
  public receive_at_mail?: boolean;

  @prop()
  public from_wp?: boolean;

  @prop()
  public retrieve_time?: number;

  @prop()
  public retrieve_key?: string;

  @prop()
  public accessToken?: string;

  public get avatar_url() {
    let url =
      this.avatar ||
      'https://gravatar.com/avatar/' +
        utility.md5(this.email.toLowerCase()) +
        '?size=48';

    // www.gravatar.com 被墙
    url = url.replace('www.gravatar.com', 'gravatar.com');

    // 让协议自适应 protocol，使用 `//` 开头
    if (url.indexOf('http:') === 0) {
      url = url.slice(5);
    }

    // 如果是 github 的头像，则限制大小
    if (url.indexOf('githubusercontent') !== -1) {
      url += '&s=120';
    }

    return url;
  }

  public get isAdvanced() {
    // 积分高于 700 则认为是高级用户
    return this.score > 700 || this.is_star;
  }
}

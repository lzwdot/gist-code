import { prop, index, mongoose } from '@typegoose/typegoose';

type ObjectId = mongoose.ObjectId;

@index({ create_at: -1 })
@index({ top: -1, last_reply_at: -1 })
@index({ author_id: 1, create_at: -1 })
export class Topic {
  @prop()
  public title?: string;

  @prop()
  public content?: string;

  @prop()
  public author_id?: ObjectId;

  @prop({ default: false })
  public top?: boolean; // 置顶帖

  @prop({ default: false })
  public good?: boolean; // 精华帖

  @prop({ default: false })
  public lock?: boolean; // 被锁定主题

  @prop({ default: 0 })
  public reply_count?: number;

  @prop({ default: 0 })
  public visit_count?: number;

  @prop({ default: 0 })
  public collect_count?: number;

  @prop({ default: Date.now })
  public create_at?: Date;

  @prop({ default: Date.now })
  public update_at?: Date;

  @prop()
  public last_reply?: ObjectId;

  @prop({ default: Date.now })
  public last_reply_at?: Date;

  @prop()
  public content_is_html?: boolean;

  @prop()
  public tab?: string;

  @prop({ default: false })
  public deleted?: boolean;
}

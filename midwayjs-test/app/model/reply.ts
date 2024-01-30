import { prop, index, mongoose } from '@typegoose/typegoose';

type ObjectId = mongoose.ObjectId;

// @modelOptions({ schemaOptions: { usePushEach: true } })
@index({ topic_id: 1 })
@index({ author_id: 1, create_at: -1 })
export class Reply {
  @prop()
  public content?: string;

  @prop()
  public topic_id?: ObjectId;

  @prop()
  public author_id?: ObjectId;

  @prop()
  public reply_id?: ObjectId;

  @prop({ default: Date.now })
  public create_at?: Date;

  @prop({ default: Date.now })
  public update_at?: Date;

  @prop()
  public content_is_html?: boolean;

  @prop({ type: () => [mongoose.Types.ObjectId] })
  public ups?: ObjectId[];

  @prop({ default: false })
  public deleted?: boolean;
}

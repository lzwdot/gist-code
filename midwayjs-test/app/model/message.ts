import { prop, index, mongoose } from '@typegoose/typegoose';

type ObjectId = mongoose.ObjectId;
@index({ master_id: 1, has_read: -1, create_at: -1 })
export class Message {
  @prop()
  public type?: string;

  @prop()
  public master_id?: ObjectId;

  @prop()
  public author_id?: ObjectId;

  @prop()
  public topic_id?: ObjectId;

  @prop()
  public reply_id?: ObjectId;

  @prop({ default: false })
  public has_read?: boolean;

  @prop({ default: Date.now })
  public create_at?: Date;
}

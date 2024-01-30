import { prop, index, mongoose } from '@typegoose/typegoose';

type ObjectId = mongoose.ObjectId;

@index({ user_id: 1, topic_id: 1 }, { unique: true })
export class TopicCollect {
  @prop()
  public user_id?: ObjectId;

  @prop()
  public topic_id?: ObjectId;

  @prop({ default: Date.now })
  public create_at?: Date;
}

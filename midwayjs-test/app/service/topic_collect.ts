import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { TopicCollect } from '../model/topic_collect';

@Provide()
export class TopicCollectService {
  @InjectEntityModel(TopicCollect)
  topicColModel: ReturnModelType<typeof TopicCollect>;

  getTopicCollect(userId: any, topicId: any) {
    const query = { user_id: userId, topic_id: topicId };
    return this.topicColModel.findOne(query).exec();
  }

  getTopicCollectsByUserId(userId: any, opt: any) {
    const defaultOpt = { sort: '-create_at' };
    opt = Object.assign(defaultOpt, opt);
    return this.topicColModel.find({ user_id: userId }, '', opt).exec();
  }

  newAndSave(userId: any, topicId: any) {
    const topic_collect: any = this.topicColModel;
    topic_collect.user_id = userId;
    topic_collect.topic_id = topicId;
    return topic_collect.save();
  }

  remove(userId: any, topicId: any) {
    const query = { user_id: userId, topic_id: topicId };
    return this.topicColModel.remove(query).exec();
  }
}

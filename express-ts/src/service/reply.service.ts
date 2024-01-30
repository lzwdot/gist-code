import appDataSource from '../config/database.config';
import { Reply } from '../types/interface';
import { ReplyEntity } from '../entity/reply.entity';
import { pageConstant } from '../config/constant.config';

const replyRepository = appDataSource.getRepository(ReplyEntity);
export class ReplyService {
  /**
   * insert & save reply
   */
  async save(data: Reply) {
    const reply = replyRepository.create(data);
    return replyRepository.save(reply);
  }

  /**
   * format reply
   */
  format(data: Reply[]) {
    const replys = data.map((reply, index) => {
      if (reply.replyParent) {
        const exist = data.find((item) => {
          return item.replyId == reply.replyParent;
        });
        reply.reply = exist;
      }
      return reply;
    });

    return replys;
  }
}

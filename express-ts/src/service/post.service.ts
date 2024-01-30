import appDataSource from '../config/database.config';
import { Post } from '../types/interface';
import { PostEntity } from '../entity/post.entity';
import { PostStatusEnum } from '../config/enum.config';
import { pageConstant } from '../config/constant.config';

export class PostService {
  public postRepository = appDataSource.getRepository(PostEntity);

  /**
   * list post
   */
  async list(page = pageConstant.page) {
    return this.postRepository
      .createQueryBuilder('posts')
      .where(`post_status=:postStatus`, { postStatus: PostStatusEnum.publish })
      .skip((page - 1) * pageConstant.size)
      .take(pageConstant.size)
      .getManyAndCount();
  }

  /**
   * insert & save post
   */
  async save(data: Post) {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  /**
   * update post
   */
  async update(where: AnyType, data: Post) {
    return this.postRepository.update(where, data);
  }

  /**
   * delete post
   */
  async delete(data: Post) {
    return this.postRepository.update(data.postId, {
      postStatus: PostStatusEnum.Delete,
    });
  }

  /**
   * increment +1
   */
  async increment(data: Post, field: string = null, value = 1) {
    return this.postRepository.increment({ postId: data.postId }, field, value);
  }

  /**
   * find by field
   */
  async findOneBy(value: number | string | AnyType, field = 'postId') {
    const post = await this.postRepository.findOneBy(
      Array.isArray(value)
        ? value
        : value instanceof Object
        ? value
        : { [field]: value },
    );

    if (!post) throw 'The post does not exists';

    return post;
  }
}

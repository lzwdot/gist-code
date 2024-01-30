import appDataSource from '../config/database.config';
import { UserEntity } from '../entity/user.entity';
import { OptionEntity } from '../entity/option.entity';
import { OptionEnum } from '../config/enum.config';
import { GithubUser, User } from '../types/interface';

export class UserService {
  public userRepository = appDataSource.getRepository(UserEntity);
  public optionRepository = appDataSource.getRepository(OptionEntity);

  /**
   * insert & save user
   */
  save(data: User) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  /**
   * update user
   */
  async update(where: AnyType, data: User) {
    return this.userRepository.update(where, data);
  }

  /**
   * find by field
   */
  async findOneBy(value: number | string | AnyType, field = 'userId') {
    const user = await this.userRepository.findOneBy(
      Array.isArray(value)
        ? value
        : value instanceof Object
        ? value
        : { [field]: value },
    );
    return user;
  }

  /**
   * find & update github profile
   */
  async github(profile: GithubUser) {
    let user: User = await this.userRepository.findOneBy({
      githubId: profile.id,
    });

    if (user) {
      this.optionRepository.update(
        { userId: user.userId, optionName: OptionEnum.GithubName },
        { optionValue: profile.login },
      );
    } else {
      user = await this.save({
        githubId: profile.id,
      });
      await this.optionRepository.insert({
        optionName: OptionEnum.GithubName,
        userId: user.userId,
        optionValue: profile.login,
      });
    }
    return user;
  }
}

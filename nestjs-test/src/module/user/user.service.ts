import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Usermeta } from '@/entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsermetaEnum } from '@/constant/enum';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Usermeta)
    private usermetaRepository: Repository<Usermeta>,
  ) { }

  /**
   * 创建
   * @param createUserDto
   * @returns
   */
  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * 根据字段查询
   * @param value 
   * @param field 
   * @returns 
   */
  async findBy(value: string, field = 'username') {
    const user = await this.userRepository.findOneBy({
      [field]: value,
    });
    return user;
  }

  /**
   * 创建/更新 github 用户信息
   * @param profile
   * @returns
   */
  async github(profile: any) {
    let user = await this.userRepository.findOneBy({
      githubId: profile.id,
    });
    if (user) {
      this.usermetaRepository.update(
        { userId: user.id, metaKey: UsermetaEnum.githubUsername },
        { metaValue: profile.username },
      );
    } else {
      user = this.userRepository.create({
        githubId: profile.id,
      });
      user = await this.userRepository.save(user);
      await this.usermetaRepository.insert({
        userId: user.id,
        metaKey: UsermetaEnum.githubUsername,
        metaValue: profile.username,
      });
    }
    return user;
  }
}

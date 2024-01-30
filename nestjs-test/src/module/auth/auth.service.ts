import { User } from '@/entity';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatch } from '@/util';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  private logger = new Logger(UserService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用于 passport 本地策略
   * @param username
   * @param passowrd
   * @returns
   */
  async validateUser(username: string, passowrd: string): Promise<any> {
    const user: User = await this.userService.findBy(username, 'userLogin');
    if (user && isMatch(passowrd, user.userPass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userPass, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 登录返回 jwt token
   * @param user
   * @returns
   */
  async login(user: any) {
    const payload = { name: user.userLogin || '', sub: user.id };

    return this.jwtService.sign(payload);
  }

  /**
   * 注册信息
   * @param data
   * @returns
   */
  async register(data: any) {
    const user: any = this.userService.create(data);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userPass, ...result } = user;
      return result;
    }
    return null;
  }
}

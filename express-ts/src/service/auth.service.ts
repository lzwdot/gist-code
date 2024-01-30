import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import passportConfig from '../config/passport.config';
import appConfig from '../config/app.config';
import { UserService } from './user.service';
import { User } from '../types/interface';
import { CryptoService } from './crypto.service';

const cryptoService = new CryptoService();
export class AuthService {
  public userService = new UserService();

  /**
   * validate user
   */
  async validate(username: string, password: string) {
    const user: User = await this.userService.findOneBy([
      { userLogin: username },
      { userEmail: username },
    ]);

    if (!user || !cryptoService.matchHash(password, user?.userPass)) {
      throw createHttpError.Forbidden('The account or password is not correct');
    }

    const { userPass, ...result } = user;
    return result;
  }

  /**
   * sign return jwt token
   */
  async jwtSign(user: User) {
    if (!user) {
      throw createHttpError.NotAcceptable('The user is empty');
    }

    const payload = {
      sub: user.userId,
      name: user.userLogin,
      group: user.userGroup,
      avatar: user.userEmail
        ? `${appConfig.avatarUrl}/avatar/${cryptoService.md5(user.userEmail)}`
        : null,
    };
    return jwt.sign(payload, passportConfig.jwt.secret, {
      expiresIn: passportConfig.jwt.expiresIn,
    });
  }

  /**
   * register user & return user
   */
  async register(data: User) {
    let user: User;

    user = await this.userService.findOneBy(data.userId);
    // not exists
    if (!user) throw createHttpError.Conflict('The user does not exists');

    // registered
    if (user.userLogin || user.userEmail)
      throw createHttpError.Conflict('The user already registered');

    // name already exists
    user = await this.userService.findOneBy(data.userLogin, 'userLogin');
    if (user)
      throw createHttpError.Conflict(
        `The name ${user.userLogin} already exists`,
      );

    // email already exists
    user = await this.userService.findOneBy(data.userEmail, 'userEmail');
    if (user)
      throw createHttpError.Conflict(
        `The email ${user.userEmail} already exists`,
      );

    data.userPass = cryptoService.genHash(data.userPass);
    user = await this.userService.save(data);
    const { ...result } = user;
    return result;
  }

  /**
   * generate code
   */
  genCode(user: User) {
    return cryptoService.md5(user.userEmail + user.userPass);
  }

  /**
   * activate user
   */
  async activate(data: User, code: string) {
    const user = await this.userService.findOneBy(data.userId);
    if (!user) throw createHttpError.BadRequest('The user does not exists');

    if (code != this.genCode(user))
      throw createHttpError.BadRequest('The code is not correct');

    if (user.activatedAt)
      throw createHttpError.BadRequest('The account has been activated');

    await this.userService.update(user.userId, {
      activatedAt: Date.now() / 1000,
    });
    const { userPass, ...result } = user;
    return result;
  }
}

import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Render,
  Logger,
  Response,
  Redirect,
  Body,
} from '@nestjs/common';
import { GithubAuthGuard, JwtAuthGuard, LocalAuthGuard } from '@/common';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { jwtConstant } from '@/constant';
import { UserGignupDto } from './dto/user-signup.dto';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * 登录页面
   * @returns
   */
  @Get('signin')
  @Render('auth/signin')
  async showSignin() {
    this.logger.debug('showSignin');

    return { title: '登录' };
  }

  /**
   * 注册页面
   * @param request
   * @param response
   * @returns
   */
  @Get('signup')
  @Render('auth/signup')
  @UseGuards(GithubAuthGuard)
  async showSignup(@Request() request, @Response() response) {
    const { user } = request;
    const accessToken = await this.authService.login(user);
    const render = {
      userLogin: user.githubUsername,
      userEmail: user.githubEmail,
    };

    this.logger.debug('showSignup', user);

    // 注册时用于校验
    if (accessToken) {
      response.cookie(jwtConstant.authKey, accessToken);
    }
    if (user.userLogin) {
      return response.redirect('/');
    }

    return { ...render };
  }

  /**
   * 跳转 github 授权
   * @returns
   */
  @Get('auth/github')
  @UseGuards(GithubAuthGuard)
  async authGithub() {
    return {};
  }

  /**
   * 用户登录
   * @param request
   * @param response
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @Redirect()
  async signin(@Request() request, @Response() response) {
    const accessToken = await this.authService.login(request.user);

    if (accessToken) {
      response.cookie(jwtConstant.authKey, accessToken);
    }

    return { url: '/' };
  }

  /**
   * 用户注册
   * @param userGignupDto
   * @param request
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Redirect()
  @Post('signup')
  async signup(@Body() userGignupDto: UserGignupDto, @Request() request) {
    const data = { ...userGignupDto, id: request.user.id };

    this.logger.debug('signup', data);

    const user = this.authService.register(data);
    if (user) {
      return { url: '/signin' };
    }
    return { url: '/signup' };
  }
}

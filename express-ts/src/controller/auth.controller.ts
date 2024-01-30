import { Request, Response } from 'express';
import { User } from '../types/interface';
import { AuthService } from '../service/auth.service';
import { JwtPayload } from 'jsonwebtoken';
import { githubMiddleware } from '../middleware/github.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserSigninDto } from './dto/user-signin.dto';
import { validMiddleware } from '../middleware/valid.middleware';
import { UserSignupDto } from './dto/user-signup.dto';
import { MailService } from '../service/mail.service';
import {
  Authorized,
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers';
import passportConfig from '../config/passport.config';

@Controller()
export class AuthController {
  private authService = new AuthService();
  private mailService = new MailService();

  /**
   * user signin page
   */
  @Get('/auth/signin')
  @Render('auth/signin')
  async signinView(@Req() req: Request, @Res() res: Response) {
    return {
      userLogin: res.locals.userLogin || '',
    };
  }

  /**
   * user login
   */
  @Post('/auth/signin')
  @Redirect('/')
  @UseBefore(validMiddleware(UserSigninDto), authMiddleware)
  async signin(@Req() req: Request, @Res() res: Response) {
    const user: User = req.user;
    const token = await this.authService.jwtSign(user);
    if (token) {
      res.cookie(passportConfig.jwt.authKey, token);
    }
  }

  /**
   * user signup page
   */
  @Get('/auth/signup')
  @Render('auth/signup')
  @UseBefore(githubMiddleware)
  async signupView(@Req() req: Request, @Res() res: Response) {
    const user: User = req.user;
    const token = user ? await this.authService.jwtSign(user) : null;

    if (token) {
      res.cookie(passportConfig.jwt.authKey, token);
    }

    if (user?.userPass) {
      res.redirect('/');
      return res;
    }

    return {
      userLogin: user?.userLogin || res.locals.userLogin || '',
      userEmail: user?.userEmail || res.locals.userEmail || '',
    };
  }

  /**
   * user register
   */
  @Post('/auth/signup')
  @Render('info/alert')
  @Authorized()
  async signup(
    @Body() body: UserSignupDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const payload: JwtPayload = req.user;
    const baseUrl = req.baseUrl;

    const user: User = await this.authService.register({
      ...body,
      userId: Number(payload.sub),
    });

    const code = this.authService.genCode(user);
    this.mailService.activeMail(
      user.userEmail,
      `${baseUrl}/auth/activate/${code}`,
      user.userEmail,
    );

    return {
      message: `The activation link has been sent to ${user.userEmail}, please check`,
    };
  }

  /**
   * user activate
   */
  @Get('/auth/activate/:code')
  @Render('info/alert')
  @Authorized()
  async activate(@Req() req: Request, @Res() res: Response) {
    const { code } = req.params;
    const payload: JwtPayload = req.user;

    await this.authService.activate({ userId: Number(payload.sub) }, code);

    return { message: `The account has been successfully activated` };
  }

  /**
   * user logout
   */
  @Get('/auth/signout')
  @Redirect('/')
  @Authorized()
  async signout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie(passportConfig.jwt.authKey);
  }
}

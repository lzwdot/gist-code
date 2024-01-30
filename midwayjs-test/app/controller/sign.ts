import validator from 'validator';
import * as utility from 'utility';
import * as uuid from 'uuid';
import {
  Get,
  Inject,
  Config,
  ALL,
  Post,
  All,
  Controller,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user';
import { BaseController } from './base';

@Controller('/')
export class SignController extends BaseController {
  @Config(ALL)
  config: any;

  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/signin')
  async showLogin() {
    await this.render('/sign/signin', {
      csrf: this.ctx.csrf,
      pageTitle: '登录',
    });
  }

  // sign up
  @Get('/signup')
  async showSignup() {
    const { ctx } = this;
    await ctx.render('/sign/signup', { pageTitle: '注册' });
  }

  @Post('/signup')
  async signup() {
    const { ctx, config } = this;
    const reqBody: any = ctx.request.body;
    const loginname = validator.trim(reqBody.loginname || '').toLowerCase();
    const email = validator.trim(reqBody.email || '').toLowerCase();
    const pass = validator.trim(reqBody.pass || '');
    const rePass = validator.trim(reqBody.re_pass || '');

    let msg: any;
    // 验证信息的正确性
    if (
      [loginname, pass, rePass, email].some(item => {
        return item === '';
      })
    ) {
      msg = '信息不完整。';
    } else if (loginname.length < 5) {
      msg = '用户名至少需要5个字符。';
    } else if (!ctx.helper.validateId(loginname)) {
      msg = '用户名不合法。';
    } else if (!validator.isEmail(email)) {
      msg = '邮箱不合法。';
    } else if (pass !== rePass) {
      msg = '两次密码输入不一致。';
    }
    // END 验证信息的正确性

    if (msg) {
      ctx.status = 422;
      await ctx.render('sign/signup', {
        error: msg,
        loginname,
        email,
      });
      return;
    }

    const users: any = await this.userService.getUsersByQuery(
      { $or: [{ loginname }, { email }] },
      {}
    );

    if (users.length > 0) {
      ctx.status = 422;
      await ctx.render('sign/signup', {
        error: '用户名或邮箱已被使用。',
        loginname,
        email,
      });
      return;
    }

    const passhash = ctx.helper.bhash(pass);

    // create gravatar
    const avatarUrl = this.userService.makeGravatar(email);

    await this.userService.newAndSave(
      loginname,
      loginname,
      passhash,
      email,
      avatarUrl,
      false
    );
    // 发送激活邮件
    // await service.mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret), loginname);
    await ctx.render('sign/signup', {
      success:
        '欢迎加入 ' +
        config.name +
        '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。',
    });
  }

  @All('/signout')
  async signout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.logout();
    ctx.redirect('/');
  }

  @Get('/active_account')
  async activeAccount() {
    const { ctx, config } = this;
    const key = validator.trim(`${ctx.query.key || ''}`);
    const name = validator.trim(`${ctx.query.name || ''}`);

    const user = await this.userService.getUserByLoginName(name);
    if (!user) {
      await ctx.render('notify/notify', { error: '用户不存在' });
      return;
    }

    const passhash = user.pass;
    if (
      !user ||
      utility.md5(user.email + passhash + config.session_secret) !== key
    ) {
      await ctx.render('notify/notify', {
        error: '信息有误，帐号无法被激活。',
      });
      return;
    }

    if (user.active) {
      await ctx.render('notify/notify', { error: '帐号已经是激活状态。' });
      return;
    }

    user.active = true;
    await user.save();
    await ctx.render('notify/notify', { success: '帐号已被激活，请登录' });
  }

  @Get('/search_pass')
  async showSearchPass() {
    await this.ctx.render('sign/search_pass');
  }

  @Post('/search_pass')
  async updateSearchPass() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const email = validator.trim(reqBody.email).toLowerCase();
    if (!validator.isEmail(email)) {
      await this.ctx.render('sign/search_pass', {
        error: '邮箱不合法',
        email,
      });
      return;
    }

    // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
    const retrieveKey = uuid.v4();
    const retrieveTime = Date.now();

    const user = await this.userService.getUserByMail(email);
    if (!user) {
      await this.ctx.render('sign/search_pass', {
        error: '没有这个电子邮箱。',
        email,
      });
      return;
    }

    user.retrieve_key = retrieveKey;
    user.retrieve_time = retrieveTime;
    await user.save();

    // 发送重置密码邮件
    // mail.sendResetPassMail(email, retrieveKey, user.loginname);
    await this.ctx.render('notify/notify', {
      success:
        '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。',
    });
  }

  @Get('/reset_pass')
  async resetPass() {
    const { ctx } = this;
    const key = validator.trim(`${ctx.query.key || ''}`);
    const name = validator.trim(`${ctx.query.name || ''}`);

    const user = await this.userService.getUserByNameAndKey(name, key);
    if (!user) {
      ctx.status = 403;
      await this.ctx.render('notify/notify', {
        error: '信息有误，密码无法重置。',
      });
      return;
    }

    const now = Date.now();
    const oneDay = 1000 * 60 * 60 * 24;
    if (!user.retrieve_time || now - user.retrieve_time > oneDay) {
      ctx.status = 403;
      await this.ctx.render('notify/notify', {
        error: '该链接已过期，请重新申请。',
      });
      return;
    }
    await this.ctx.render('sign/reset', { name, key });
  }

  @Post('/reset_pass')
  async updatePass() {
    const { ctx } = this;
    const reqBody: any = ctx.request.body;
    const psw = validator.trim(reqBody.psw) || '';
    const repsw = validator.trim(reqBody.repsw) || '';
    const key = validator.trim(reqBody.key) || '';
    const name = validator.trim(reqBody.name) || '';

    if (psw !== repsw) {
      await this.ctx.render('sign/reset', {
        name,
        key,
        error: '两次密码输入不一致。',
      });
      return;
    }
    const user = await this.userService.getUserByNameAndKey(name, key);

    if (!user) {
      await this.ctx.render('notify/notify', {
        error: '错误的激活链接',
      });
      return;
    }
    const passhash = ctx.helper.bhash(psw);
    user.pass = passhash;
    user.retrieve_key = null;
    user.retrieve_time = null;
    user.active = true; // 用户激活

    await user.save();
    await this.ctx.render('notify/notify', { success: '你的密码已重置。' });
  }
}

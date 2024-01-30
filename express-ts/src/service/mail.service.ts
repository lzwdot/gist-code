import nodemailer, { SendMailOptions } from 'nodemailer';
import mailConfig from '../config/mail.config';
import { LoggerService } from './logger.service';

const lggerService = new LoggerService();
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host, // 'smtp.forwardemail.net',
      port: mailConfig.port, // 465,
      secure: mailConfig.secure, // true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        // user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        // pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
        ...mailConfig.auth,
      },
    });
  }

  // async..await is not allowed in global scope, must use a wrapper
  async sendMail(options: SendMailOptions) {
    try {
      // send mail with defined transport object
      const info = await this.transporter.sendMail({
        from: mailConfig.auth.user, //'"Fred Foo 👻" <foo@example.com>', // sender address
        to: options.to, //'bar@example.com, baz@example.com', // list of receivers
        subject: options.subject, // 'Hello ✔', // Subject line
        // text: options.text, //'Hello world?', // plain text body
        html: options.html, //'<b>Hello world?</b>' // html body
      });

      lggerService
        .getLogger()
        .info(`mail sent: ${info.messageId}${JSON.stringify(info.envelope)}`);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
    } finally {
      this.transporter.close();
    }
  }

  async activeMail(who: string, url: string, name: string) {
    const html = `<a href='${url}'>please click</a>`;

    await this.sendMail({
      subject: 'account activation',
      to: who,
      html: html,
    });
  }

  async resetPassMail(who: string, url: string, name: string) {
    const html = `<a href='${url}'>please click</a>`;

    await this.sendMail({
      subject: 'reset password',
      to: who,
      html: html,
    });
  }
}

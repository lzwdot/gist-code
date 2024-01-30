import passport from 'passport';
import createHttpError from 'http-errors';
import passportConfig from '../config/passport.config';
import { GithubUser } from '../types/interface';
import { Request, Response } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[passportConfig.jwt.authKey];
  }
  return token;
};
export class PassportService {
  public authService = new AuthService();
  public userService = new UserService();
  public passport = passport;

  constructor() {
    this.passport.use(
      new LocalStrategy(
        { ...passportConfig.local },
        async (username, password, done) => {
          try {
            const user = await this.authService.validate(username, password);
            return done(null, user);
          } catch (err: AnyType) {
            return done(err);
          }
        },
      ),
    );

    this.passport.use(
      new GitHubStrategy(
        { ...passportConfig.github },
        async (accessToken, refreshToken, profile, done) => {
          try {
            if (!profile) {
              throw 'Github is unauthorized';
            }

            const _json: GithubUser = profile?._json;
            const user = await this.userService.github(_json);
            return done(null, {
              ...user,
              userLogin: _json.login,
              userEmail: _json.email,
            });
          } catch (err: AnyType) {
            return done(err);
          }
        },
      ),
    );

    this.passport.use(
      new JwtStrategy(
        {
          secretOrKey: passportConfig.jwt.secret,
          jwtFromRequest: ExtractJwt.fromExtractors([
            cookieExtractor,
            ExtractJwt.fromAuthHeaderAsBearerToken(),
          ]),
        },
        function (payload, done) {
          return done(null, payload);
        },
      ),
    );
  }

  getPassport() {
    return this.passport;
  }
}

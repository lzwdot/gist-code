import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CasService } from '../service/cas.service';
import { Action } from 'routing-controllers';
import { PassportService } from '../service/passport.service';
import passportConfig from '../config/passport.config';
import createHttpError from 'http-errors';

const casService = new CasService();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  new PassportService()
    .getPassport()
    .authenticate('local', { ...passportConfig.local })(req, res, next);
}

export function authChecker(action: Action, _roles: string[]) {
  const { request: req, response: res, next } = action;

  return new Promise<boolean>((resolve, _reject) => {
    new PassportService()
      .getPassport()
      .authenticate(
        'jwt',
        { ...passportConfig.jwt },
        (err: Error, user?: Express.User, info?: JsonWebTokenError) => {
          if (err) {
            throw createHttpError.Unauthorized(err.message);
          }
          if (!user) {
            return res.redirect('/auth/signin');
          }
          if (info) {
            throw createHttpError.Unauthorized(info.message);
          }

          req.user = user;
          req.ability = casService.defineAbilityFor(user);
          return resolve(true);
        },
      )(req, res, next);
  });
}

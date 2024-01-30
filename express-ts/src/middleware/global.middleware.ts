import passportConfig from '../config/passport.config';
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { PassportService } from '../service/passport.service';
import { JsonWebTokenError } from 'jsonwebtoken';

const passport = new PassportService().getPassport();
@Middleware({ type: 'before' })
export class GlobalMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    req.baseUrl = req.protocol + '://' + req.get('host');
    res.locals = {
      ...res.locals,
      baseUrl: req.baseUrl,
    };

    passport.authenticate(
      'jwt',
      { ...passportConfig.jwt },
      (err: Error, user?: Express.User, info?: JsonWebTokenError) => {
        req.user = res.locals.user = user;

        next();
      },
    )(req, res, next);
  }
}

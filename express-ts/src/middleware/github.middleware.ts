import passportConfig from '../config/passport.config';
import { Request, Response, NextFunction } from 'express';
import { PassportService } from '../service/passport.service';

const passport = new PassportService().getPassport();
export function githubMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.user
    ? next()
    : passport.authenticate('github', { ...passportConfig.github })(
        req,
        res,
        next,
      );
}

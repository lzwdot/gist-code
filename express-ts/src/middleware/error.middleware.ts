import appConfig from '../config/app.config';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { ForbiddenError } from '@casl/ability';
import { ValidationError } from 'class-validator';
import { LoggerService } from '../service/logger.service';

const loggerService = new LoggerService();

function handleValidError(errors: ValidationError[]) {
  return errors.map((error: ValidationError) =>
    Object.values(error.constraints),
  );
}

export function errorMiddleware(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (Array.isArray(err.errors) && err.errors[0] instanceof ValidationError) {
      res.flash(handleValidError(err.errors), 'warning');
      return res.redirect('back');
    }

    const status: number =
      err instanceof ForbiddenError ? 403 : err.status || err.httpCode || 500;
    const message: string = err ? err.message : 'Something went wrong';

    loggerService
      .getLogger()
      .error(
        `[${req.method}] ${req.path} >> Status:${status},Message:${message}\n${err.stack}`,
      );

    // set locals, only providing error in development
    const locals = {
      status,
      message,
      stack: appConfig.isDev ? err.stack : '',
    };
    res.locals = {
      ...res.locals,
      ...locals,
    };

    // render the error page or json
    res.status(status);
    if (req.xhr || req.headers['sec-fetch-dest']) {
      res.json(locals);
    } else {
      res.render('info/error');
    }
  } catch (err) {
    next(err);
  }
}

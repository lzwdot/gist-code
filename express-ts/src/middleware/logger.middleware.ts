import morgan from 'morgan';
import appConfig from '../config/app.config';
import { Request, Response, NextFunction } from 'express';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { LoggerService } from '../service/logger.service';

const loggerService = new LoggerService();
@Middleware({ type: 'before' })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    morgan(appConfig.isDev ? 'dev' : 'combined', {
      stream: {
        write: (message) => {
          loggerService.getLogger().info(message.trim());
        },
      },
    })(req, res, next);
  }
}

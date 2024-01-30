import 'reflect-metadata';
import debug from 'debug';
import bodyParser from 'body-parser';
import createHttpError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import cookieSession from 'cookie-session';
import passport from 'passport';
import methodOverride from 'method-override';
import appConfig from './config/app.config';
import appDataSource from './config/database.config';
import sessionConfig from './config/session.config';
import { I18n } from 'i18n';
import { errorMiddleware } from './middleware/error.middleware';
import { useExpressServer } from 'routing-controllers';
import { authChecker } from './middleware/auth.middleware';
import { LoggerService } from './service/logger.service';
import { flashMiddleware } from './middleware/flash.middleware';

async function bootstrap() {
  const app: express.Application = express();
  const logger = new LoggerService().getLogger();

  // connect to MySQL
  appDataSource.initialize().catch((err) => logger.error(err));

  // view engine setup
  app.engine('html', ejs.renderFile);
  app.set('views', `${appConfig.rootDir}/${appConfig.viewPath}`);
  app.set('view engine', 'html');

  // user middleware
  app.use(passport.initialize());
  app.use(cookieParser(sessionConfig.cookie.secret));
  app.use(cookieSession({ ...sessionConfig.session }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(flashMiddleware);
  app.use(express.static('public'));
  app.use(
    new I18n({
      locales: ['cn'],
      directory: `${appConfig.rootDir}/${appConfig.srcPath}/${appConfig.i18nPath}`,
      defaultLocale: 'cn',
    }).init,
  );
  app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    }),
  );

  // use routing controllers
  useExpressServer(app, {
    defaultErrorHandler: false,
    development: appConfig.isDev,
    controllers: [
      `${appConfig.rootDir}/${appConfig.srcPath}/controller/*.controller.*`,
    ],
    middlewares: [
      `${appConfig.rootDir}/${appConfig.srcPath}/middleware/*.middleware.*`,
    ],
    authorizationChecker: authChecker,
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    req.url === '/' || res.headersSent
      ? next()
      : next(createHttpError.NotFound());
  });

  // error middleware
  app.use(errorMiddleware);

  // start express server.
  app.listen(appConfig.appPort, () => {
    debug('express')(
      'App is running at http://localhost:%d in %s mode',
      appConfig.appPort,
      appConfig.appEnv,
    );
  });
}

bootstrap();

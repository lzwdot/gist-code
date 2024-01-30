import { createLogger, format, transports } from 'winston';
import appConfig from '../config/app.config';
import dayjs from 'dayjs';

export class LoggerService {
  private logger;
  private logDir = `${appConfig.rootDir}/${appConfig.logPath}`;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}] ${message}`,
        ),
      ),
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({
          filename: `${this.logDir}/error.log`,
          level: 'error',
          format: format.uncolorize(),
        }),
        new transports.File({
          filename: `${this.logDir}/${dayjs().format('YYYY-MM-DD')}.log`,
          format: format.uncolorize(),
        }),
      ],
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (appConfig.isDev) {
      this.logger.add(new transports.Console());
    }
  }

  getLogger() {
    return this.logger;
  }
}

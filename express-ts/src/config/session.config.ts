import { createHash } from 'crypto';
import appConfig from './app.config';

export default {
  session: {
    name: 'session',
    keys: ['session'],
  },
  cookie: {
    secret: createHash('md5').update(appConfig.appKey).digest('hex'),
  },
};

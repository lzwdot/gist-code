import appConfig from './app.config';
import { createHash } from 'crypto';
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } =
  process.env;

export default {
  local: {
    session: false,
    usernameField: 'userLogin',
    passwordField: 'userPass',
  },
  jwt: {
    session: false,
    secret: createHash('md5').update(appConfig.appKey).digest('hex'),
    authKey: 'authorization',
    expiresIn: '1d',
  },
  github: {
    session: false,
    clientID: GITHUB_CLIENT_ID || '',
    clientSecret: GITHUB_CLIENT_SECRET || '',
    callbackURL: GITHUB_CALLBACK_URL || '',
  },
};

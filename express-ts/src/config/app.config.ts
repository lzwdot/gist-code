import { config } from 'dotenv';
import path from 'path';

config({ path: `.env` });
const { NODE_ENV, APP_PORT, APP_KEY } = process.env;
const rootDir = path.join(__dirname, '../..');

export default {
  appEnv: NODE_ENV || 'development',
  appPort: APP_PORT || 3000,
  appKey: APP_KEY || '',
  isDev: NODE_ENV === 'development',
  rootDir: rootDir,
  publicPath: 'public',
  logPath: 'logs',
  srcPath: 'src',
  viewPath: 'views',
  uploadPath: `upload`,
  i18nPath: `locales`,
  avatarUrl: 'https://gravatar.cn',
};

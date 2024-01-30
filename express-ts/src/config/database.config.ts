import appConfig from './app.config';
import { DataSource, FileLogger } from 'typeorm';
import { ReplyEntity } from '../entity/reply.entity';
import { PostEntity } from '../entity/post.entity';
import { TermEntity } from '../entity/term.entity';
import { OptionEntity } from '../entity/option.entity';
import { RelationEntity } from '../entity/relation.entity';
import { UserEntity } from '../entity/user.entity';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
const appDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 3306,
  username: DB_USER || '',
  password: DB_PASSWORD || '',
  database: DB_DATABASE || '',
  entities: [
    ReplyEntity,
    PostEntity,
    TermEntity,
    OptionEntity,
    RelationEntity,
    UserEntity,
  ],
  migrations: [],
  subscribers: [],
  synchronize: appConfig.isDev,
  logger: new FileLogger(appConfig.isDev, {
    logPath: `${appConfig.logPath}/sql.log`,
  }),
});

export default appDataSource;

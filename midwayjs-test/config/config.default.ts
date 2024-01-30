import { MidwayConfig } from '@midwayjs/core';
import { Message } from '../app/model/message';
import { Reply } from '../app/model/reply';
import { TopicCollect } from '../app/model/topic_collect';
import { Topic } from '../app/model/topic';
import { User } from '../app/model/user';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1673422673564_3620',
  koa: {
    port: 7001,
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://localhost:27017/test',
        Options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: '',
          pass: '',
        },
        entities: [Message, Reply, TopicCollect, Topic, User],
      },
    },
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  },
  view: {
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs',
    },
    rootDir: {
      default: join(__dirname, '..', './app/view'),
    },
  },
  ejs: {
    layout: 'layout.html',
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/public',
        // dir: join(__dirname, '..', './app/public'),
        alias: {
          '/': '/index.html',
        },
      },
    },
  },
} as MidwayConfig;

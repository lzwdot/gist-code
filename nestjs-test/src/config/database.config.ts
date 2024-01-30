import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
  mysql: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nestjs',
    entities: [join(__dirname, '..', '/**/*.entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: true, // 生产环境关闭
    // logging: true,
  },
}));

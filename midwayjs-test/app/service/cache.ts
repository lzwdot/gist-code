import { Provide, Inject } from '@midwayjs/decorator';
import { CacheManager } from '@midwayjs/cache';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class CacheService {
  @Inject()
  cacheManager: CacheManager;

  @Inject()
  logger: ILogger;

  async get(key: any) {
    const { cacheManager, logger } = this;
    const t = Date.now();
    let data: any = await cacheManager.get(key);
    if (!data) return;
    data = JSON.parse(data);
    const duration = Date.now() - t;
    logger.debug('Cache', 'get', key, duration + 'ms');
    return data;
  }

  async setex(key: any, value: string, seconds: any) {
    const { cacheManager, logger } = this;
    const t = Date.now();
    value = JSON.stringify(value);
    await cacheManager.set(key, value, { ttl: seconds });
    const duration = Date.now() - t;
    logger.debug('Cache', 'set', key, duration + 'ms');
  }

  async incr(key: any, seconds: any) {
    const { cacheManager, logger } = this;
    const t = Date.now();
    const result = await cacheManager.set(
      key,
      cacheManager.get(key)
        ? Number(cacheManager.get(key)) + 1
        : cacheManager.get(key),
      {
        ttl: seconds,
      }
    );
    const duration = Date.now() - t;
    logger.debug('Cache', 'set', key, duration + 'ms');
    return result[0][1];
  }
}

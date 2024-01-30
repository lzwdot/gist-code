import appConfig from '../config/app.config';
import { hashSync, compareSync } from 'bcryptjs';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
  createHash,
} from 'crypto';
export class CryptoService {
  private cryptoOp = {
    algorithm: 'aes-256-ctr',
    key: scryptSync(appConfig.appKey, this.md5(appConfig.appKey), 32),
    iv: randomBytes(16),
  };
  /**
   * generate hash
   */
  genHash(data: string) {
    let hash = null;
    if (data) {
      hash = hashSync(data, 10);
    }
    return hash;
  }

  /**
   * match hash
   */
  matchHash(data: string, encrypted: string) {
    if (!data || !encrypted) {
      return false;
    }
    return compareSync(data, encrypted);
  }

  /*
   * md5
   */
  md5(data: string) {
    const hash = createHash('md5');
    return hash.update(data).digest('hex');
  }

  /**
   *
   * encrypt text
   */
  encrypt(data: string) {
    const { algorithm, key, iv } = this.cryptoOp;
    const cipher = createCipheriv(algorithm, key, iv);
    return {
      iv: iv.toString('hex'),
      data: cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    };
  }

  /**
   *
   * decrypt text
   */
  decrypt(data: string, iv: string) {
    const { algorithm, key } = this.cryptoOp;
    const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf-8');
  }

  /**
   * encode base64
   */
  enBase64(data: string) {
    return Buffer.from(data, 'utf-8').toString('base64');
  }

  /**
   * decode base64
   */
  deBase64(data: string) {
    return Buffer.from(data, 'base64').toString('utf-8');
  }
}

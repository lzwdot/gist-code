import fs from 'fs';
import appConfig from '../config/app.config';
import sharp from 'sharp';
import { CryptoService } from './crypto.service';
import { LoggerService } from './logger.service';

const cryptoService = new CryptoService();
const loggerService = new LoggerService();

export class FileService {
  private publicDir = `${appConfig.rootDir}/${appConfig.publicPath}`;
  private uploadPath = appConfig.uploadPath;
  /**
   * replace image
   */
  async match(data: string, path: string) {
    const regular = /!\[.*?\]\((.*?)\)/gm;
    const temps = [];
    let matcher;
    while ((matcher = regular.exec(data))) {
      temps.push(matcher[1]);
    }
    this.clear(temps, path);
    return data;
  }

  /**
   * image to webp
   */
  async toWebp(data: Buffer, path: string) {
    const filePath = `${this.uploadPath}/${path}`;
    const dirName = `${this.publicDir}/${filePath}`;
    const fileName = `${cryptoService.md5(Buffer.from(data).toString())}.webp`;
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    try {
      await sharp(data).toFile(`${dirName}/${fileName}`);
    } catch (err) {
      loggerService.getLogger().error(err);
      return data;
    }

    return `/${filePath}/${fileName}`;
  }

  /**
   * clear image
   */

  async clear(data: string[], path: string) {
    const filePath = `${this.uploadPath}/${path}`;
    const dirName = `${this.publicDir}/${filePath}`;

    if (!fs.existsSync(dirName)) {
      return false;
    }

    const files = fs.readdirSync(dirName);
    files.forEach((file) => {
      const isExist = data.find((item) => item.includes(file));
      if (!isExist) {
        fs.unlinkSync(`${dirName}/${file}`);
      }
    });
  }

  /**
   * is base64
   */
  isBase64(data: string) {
    return data.startsWith('data:image');
  }
}

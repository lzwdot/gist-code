import { Request } from 'express';
import { FileService } from '../service/file.service';
import { CryptoService } from '../service/crypto.service';
import { AssetUploadDto as FileUploadDto } from './dto/file-upload.dto';
import { FileFilterCallback } from 'multer';
import {
  Authorized,
  Body,
  Controller,
  Post,
  UploadedFile,
} from 'routing-controllers';

const fileService = new FileService();
const cryptoService = new CryptoService();

const uploadOptions = {
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error(req.__('Invalid image')));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
};

@Controller()
export class FileController {
  /**
   * upload img
   */
  @Post('/file/upload')
  @Authorized()
  async upload(
    @UploadedFile('file', { required: true, options: uploadOptions })
    file: Express.Multer.File,
    @Body() body: FileUploadDto,
  ) {
    const { id, type } = body;
    const filePath = await fileService.toWebp(
      file.buffer as Buffer,
      `${type}/${cryptoService.md5(id)}`,
    );

    return {
      data: filePath,
      message: file.originalname,
    };
  }
}

import { IsNotEmpty, ValidateIf } from 'class-validator';
import { Reply } from '../../types/interface';

export class ReplyStoreDto {
  @IsNotEmpty()
  replyText: string;
}

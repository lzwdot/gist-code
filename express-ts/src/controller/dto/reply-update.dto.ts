import { IsNumberString } from 'class-validator';

export class ReplyUpdateDto {
  @IsNumberString()
  postId: string;
}

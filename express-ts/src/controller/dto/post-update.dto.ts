import { IsNotEmpty } from 'class-validator';

export class PostUpdateDto {
  @IsNotEmpty()
  postId: number;
}

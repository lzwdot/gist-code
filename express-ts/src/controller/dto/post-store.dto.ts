import { IsNotEmpty } from 'class-validator';

export class PostStoreDto {
  @IsNotEmpty()
  postTitle: string;

  @IsNotEmpty()
  postText: string;

  postTags: [];
}

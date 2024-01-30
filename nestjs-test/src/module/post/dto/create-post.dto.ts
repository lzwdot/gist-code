import { IsNotEmpty, MinLength } from "class-validator";

export class CreatePostDto {
  @MinLength(10, { message: '标题至少10字以上' })
  postTitle: string;

  @IsNotEmpty({ message: '内容不能为空' })
  postContent: string;
}

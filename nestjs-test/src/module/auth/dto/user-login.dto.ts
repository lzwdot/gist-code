import { IsNotEmpty, IsNotIn } from 'class-validator';

export class UserLoginDto {
  @IsNotIn(['', undefined, null], { message: '账号不能为空' })
  userLogin: string;

  @IsNotEmpty({ message: '密码不能为空' })
  userPass: string;
}

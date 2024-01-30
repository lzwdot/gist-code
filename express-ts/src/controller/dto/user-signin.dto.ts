import { IsNotEmpty, IsNotIn } from 'class-validator';

export class UserSigninDto {
  @IsNotIn(['', undefined, null], { message: 'userLogin should not be empty' })
  userLogin: string;

  @IsNotEmpty()
  userPass: string;
}

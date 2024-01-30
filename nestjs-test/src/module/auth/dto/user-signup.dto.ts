import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

function IsEqualsPass(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEqualsPass',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          return value === relatedValue;
        },
      },
    });
  };
}

export class UserGignupDto {
  @IsNotIn(['', undefined, null], { message: '用户名不能为空' })
  userLogin: string;

  @IsNotEmpty({ message: '密码不能为空' })
  userPass: string;

  @IsEqualsPass('userPass', {
    message: '两次输入的密码不一致',
  })
  rePass: string;

  @IsEmail({ message: '邮箱格式不正确' })
  userEmail: string;
}

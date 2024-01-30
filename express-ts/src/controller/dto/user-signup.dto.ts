import {
  IsEmail,
  IsNotEmpty,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsEqualsPass(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEqualsPass',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as AnyType)[relatedPropertyName];

          return value === relatedValue;
        },
      },
    });
  };
}
export class UserSignupDto {
  @IsNotEmpty()
  userLogin: string;

  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  userPass: string;

  @IsEqualsPass('userPass', {
    message: 'rePassword must be equal to password',
  })
  @IsNotEmpty()
  rePassword: string;
}

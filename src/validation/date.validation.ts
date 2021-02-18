import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as dateMath from 'date-arithmetic';

export function IsOlderThan(minAge: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOlderThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
            const today = new Date();
            const latestDateOfBirth = dateMath.subtract(today, minAge, 'year');
            return dateMath.lt(value, latestDateOfBirth);
        },
      },
    });
  };
}
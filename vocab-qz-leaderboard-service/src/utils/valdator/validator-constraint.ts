import { REGEX_VIETNAMESE_PHONE } from '@utils/constants';
import { isDate } from '@utils/helper';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    // Regular expression for basic phone number validation
    const regex = REGEX_VIETNAMESE_PHONE;
    return regex.test(phoneNumber);
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsPhoneNumberConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isDateFormat', async: false })
class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(date: string) {
    return isDate(date);
  }
}
export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsDateFormatConstraint,
    });
  };
}

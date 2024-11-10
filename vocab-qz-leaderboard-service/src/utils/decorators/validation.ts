import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';

interface ValidationFieldInterface {
  validate(date: Date, args: ValidationArguments): Promise<boolean> | boolean;
  // defaultMessage(args: ValidationArguments): void;
  defaultMessage?(validationArguments?: ValidationArguments): void;
}

@ValidatorConstraint({ name: 'GreaterOrEqualDate' })
export class GreaterOrEqualDate implements ValidationFieldInterface {
  validate(value: Date, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as Date)[relatedPropertyName];
    if (value === null) {
      return true;
    }
    return value >= relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be a date string and greater or equal ${relatedPropertyName}. Ex: YYYY-MM-DDT00:00:00.000Z`;
  }
}

@ValidatorConstraint({ name: 'IsFutureDate', async: false })
@Injectable()
export class IsFutureDate implements ValidationFieldInterface {
  validate(date: Date) {
    const currentDate = new Date(date);
    // Set the hours and minutes to the last hour of the day
    currentDate.setHours(23);
    currentDate.setMinutes(59);
    return currentDate >= new Date();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a date string and greater or equal today. Ex: YYYY-MM-DDT00:00:00.000Z`;
  }
}

import { ValidationArguments } from 'class-validator';
interface ValidationFieldInterface {
    validate(date: Date, args: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): void;
}
export declare class GreaterOrEqualDate implements ValidationFieldInterface {
    validate(value: Date, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsFutureDate implements ValidationFieldInterface {
    validate(date: Date): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export {};

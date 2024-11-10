"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneNumber = IsPhoneNumber;
exports.IsDateFormat = IsDateFormat;
const constants_1 = require("../constants");
const helper_1 = require("../helper");
const class_validator_1 = require("class-validator");
let IsPhoneNumberConstraint = class IsPhoneNumberConstraint {
    validate(phoneNumber) {
        const regex = constants_1.REGEX_VIETNAMESE_PHONE;
        return regex.test(phoneNumber);
    }
};
IsPhoneNumberConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isPhoneNumber', async: false })
], IsPhoneNumberConstraint);
function IsPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsPhoneNumberConstraint,
        });
    };
}
let IsDateFormatConstraint = class IsDateFormatConstraint {
    validate(date) {
        return (0, helper_1.isDate)(date);
    }
};
IsDateFormatConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDateFormat', async: false })
], IsDateFormatConstraint);
function IsDateFormat(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isDateFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsDateFormatConstraint,
        });
    };
}
//# sourceMappingURL=validator-constraint.js.map
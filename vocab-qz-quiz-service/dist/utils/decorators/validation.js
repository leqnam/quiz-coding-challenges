"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFutureDate = exports.GreaterOrEqualDate = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let GreaterOrEqualDate = class GreaterOrEqualDate {
    validate(value, args) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        if (value === null) {
            return true;
        }
        return value >= relatedValue;
    }
    defaultMessage(args) {
        const [relatedPropertyName] = args.constraints;
        return `${args.property} must be a date string and greater or equal ${relatedPropertyName}. Ex: YYYY-MM-DDT00:00:00.000Z`;
    }
};
exports.GreaterOrEqualDate = GreaterOrEqualDate;
exports.GreaterOrEqualDate = GreaterOrEqualDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'GreaterOrEqualDate' })
], GreaterOrEqualDate);
let IsFutureDate = class IsFutureDate {
    validate(date) {
        const currentDate = new Date(date);
        currentDate.setHours(23);
        currentDate.setMinutes(59);
        return currentDate >= new Date();
    }
    defaultMessage(args) {
        return `${args.property} must be a date string and greater or equal today. Ex: YYYY-MM-DDT00:00:00.000Z`;
    }
};
exports.IsFutureDate = IsFutureDate;
exports.IsFutureDate = IsFutureDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsFutureDate', async: false }),
    (0, common_1.Injectable)()
], IsFutureDate);
//# sourceMappingURL=validation.js.map
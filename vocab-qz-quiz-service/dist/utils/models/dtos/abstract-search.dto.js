"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSearchDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
class AbstractSearchDto {
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value ?? 0;
    }
    get take() {
        return this._take;
    }
    set take(value) {
        if (!value) {
            this._take = 10;
        }
        else if (value > 100) {
            this._take = 100;
        }
        else {
            this._take = value;
        }
    }
    constructor() {
        this._take = 10;
        this._page = 1;
    }
}
exports.AbstractSearchDto = AbstractSearchDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AbstractSearchDto.prototype, "q", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], AbstractSearchDto.prototype, "page", null);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, typeorm_1.Column)({ default: 10 }),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], AbstractSearchDto.prototype, "take", null);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AbstractSearchDto.prototype, "orderBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AbstractSearchDto.prototype, "exact", void 0);
//# sourceMappingURL=abstract-search.dto.js.map
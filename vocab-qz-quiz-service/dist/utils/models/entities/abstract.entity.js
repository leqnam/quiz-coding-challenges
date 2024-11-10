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
exports.AbstractEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const helper_1 = require("../../helper");
const utils_service_1 = require("../../services/utils.service");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const classes_1 = require("@automapper/classes");
class AbstractEntity {
    toDto(options) {
        return utils_service_1.UtilsService.toDto(this.dtoClass, this, options);
    }
}
exports.AbstractEntity = AbstractEntity;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createDate', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày giờ khởi tạo' }),
    (0, class_validator_1.IsOptional)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'effectDate', type: 'timestamptz', nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu có hiệu lực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "effectDate", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'inactiveDate',
        type: 'timestamptz',
        nullable: true,
    }),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày hết hiệu lực' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, classes_1.AutoMap)(),
    (0, class_transformer_1.Transform)(date => (0, helper_1.transformEndOfDate)(date.value)),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "inactiveDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'dateLastMaint',
        type: 'timestamptz',
        nullable: true,
    }),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ngày giờ cập nhật' }),
    (0, class_validator_1.IsOptional)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "dateLastMaint", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ name: 'version', type: 'bigint', nullable: true }),
    (0, swagger_1.ApiPropertyOptional)({
        description: "Special column that is automatically set to the entity's version (incremental number) each time you call save from entity manager or repository.",
    }),
    __metadata("design:type", Number)
], AbstractEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'addedBy', nullable: true }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AbstractEntity.prototype, "addedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'editedBy', nullable: true }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AbstractEntity.prototype, "editedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'deletedBy', nullable: true }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], AbstractEntity.prototype, "deletedBy", void 0);
//# sourceMappingURL=abstract.entity.js.map
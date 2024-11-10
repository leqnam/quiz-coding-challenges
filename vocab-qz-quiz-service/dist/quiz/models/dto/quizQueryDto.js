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
exports.QuizQueryDto = void 0;
const classes_1 = require("@automapper/classes");
const abstract_dto_1 = require("../../../utils/models/dtos/abstract.dto");
class QuizQueryDto extends abstract_dto_1.AbstractDto {
}
exports.QuizQueryDto = QuizQueryDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "code", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "hostId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "addedBy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], QuizQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], QuizQueryDto.prototype, "note", void 0);
//# sourceMappingURL=quizQueryDto.js.map
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
exports.QuizHist = void 0;
const abstract_entity_1 = require("../../../utils/models/entities/abstract.entity");
const typeorm_1 = require("typeorm");
const quiz_dto_1 = require("../dto/quiz.dto");
let QuizHist = class QuizHist extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = quiz_dto_1.QuizDto;
    }
};
exports.QuizHist = QuizHist;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizHist.prototype, "histId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizHist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizHist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizHist.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'Foreign Key, UUID: The userId of the person hosting the quiz.',
    }),
    __metadata("design:type", String)
], QuizHist.prototype, "hostId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizHist.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], QuizHist.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuizHist.prototype, "note", void 0);
exports.QuizHist = QuizHist = __decorate([
    (0, typeorm_1.Entity)({ name: 'quizhist' })
], QuizHist);
//# sourceMappingURL=quizHist.entity.js.map
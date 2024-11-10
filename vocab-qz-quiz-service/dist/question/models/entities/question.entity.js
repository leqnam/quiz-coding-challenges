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
exports.Question = void 0;
const classes_1 = require("@automapper/classes");
const quiz_entity_1 = require("../../../quiz/models/entities/quiz.entity");
const entity_history_decorator_1 = require("../../../utils/decorators/entity-history.decorator");
const abstract_entity_1 = require("../../../utils/models/entities/abstract.entity");
const typeorm_1 = require("typeorm");
const question_dto_1 = require("../dto/question.dto");
const questionHist_entity_1 = require("./questionHist.entity");
let Question = class Question extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = question_dto_1.QuestionDto;
    }
};
exports.Question = Question;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Question.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryColumn)({
        comment: 'Foreign Key, UUID: The quiz_id to which this question belongs.',
    }),
    __metadata("design:type", String)
], Question.prototype, "quizId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true, comment: 'multiple_choice, text, boolean' }),
    __metadata("design:type", String)
], Question.prototype, "answerType", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'A list of possible answers (only used if answer_type is multiple_choice)',
    }),
    __metadata("design:type", String)
], Question.prototype, "choices", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'The correct answer to the question.',
    }),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'A detailed explanation of the answer.',
    }),
    __metadata("design:type", String)
], Question.prototype, "explanation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Question.prototype, "isActive", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, _quiz => _quiz.questions),
    __metadata("design:type", quiz_entity_1.Quiz)
], Question.prototype, "quiz", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)({ name: 'question' }),
    (0, entity_history_decorator_1.HistoryEntity)(questionHist_entity_1.QuestionHist)
], Question);
//# sourceMappingURL=question.entity.js.map
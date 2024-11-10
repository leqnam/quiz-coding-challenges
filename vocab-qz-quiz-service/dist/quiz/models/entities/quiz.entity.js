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
exports.Quiz = exports.QuizStatus = void 0;
const classes_1 = require("@automapper/classes");
const entity_history_decorator_1 = require("../../../utils/decorators/entity-history.decorator");
const abstract_entity_1 = require("../../../utils/models/entities/abstract.entity");
const typeorm_1 = require("typeorm");
const quiz_dto_1 = require("../dto/quiz.dto");
const quizHist_entity_1 = require("./quizHist.entity");
const question_entity_1 = require("../../../question/models/entities/question.entity");
var QuizStatus;
(function (QuizStatus) {
    QuizStatus["PENDING"] = "pending";
    QuizStatus["ACTIVE"] = "active";
    QuizStatus["ENDED"] = "ended";
})(QuizStatus || (exports.QuizStatus = QuizStatus = {}));
let Quiz = class Quiz extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = quiz_dto_1.QuizDto;
    }
};
exports.Quiz = Quiz;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "code", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'Foreign Key, UUID: The userId of the person hosting the quiz.',
    }),
    __metadata("design:type", String)
], Quiz.prototype, "hostId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QuizStatus,
        default: QuizStatus.PENDING,
    }),
    __metadata("design:type", String)
], Quiz.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Quiz.prototype, "isActive", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, question => question.quiz, { cascade: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)({ name: 'quiz' }),
    (0, entity_history_decorator_1.HistoryEntity)(quizHist_entity_1.QuizHist)
], Quiz);
//# sourceMappingURL=quiz.entity.js.map
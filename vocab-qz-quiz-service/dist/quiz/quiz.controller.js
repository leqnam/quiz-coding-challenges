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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const quizSearch_dto_1 = require("./models/dto/quizSearch.dto");
const query_transform_pipe_1 = require("../utils/pipes/query-transform.pipe");
const quiz_dto_1 = require("./models/dto/quiz.dto");
const quiz_service_1 = require("./quiz.service");
const utils_service_1 = require("../utils/services/utils.service");
let QuizController = class QuizController {
    constructor(quizService, classMapper) {
        this.quizService = quizService;
        this.classMapper = classMapper;
    }
    async get(searchModel) {
        const result = await this.quizService.query(searchModel);
        return result;
    }
    async findById(id) {
        const quiz = await this.quizService.findById(id);
        return new quiz_dto_1.QuizDto(utils_service_1.UtilsService.cleanNullObject(quiz));
    }
    async createQuiz(req, body) {
        const token = req.headers.authorization?.split(' ')[1];
        const quiz = await this.quizService.createQuiz(token, body);
        return new quiz_dto_1.QuizDto(utils_service_1.UtilsService.cleanNullObject(quiz));
    }
    async startQuiz(quizId) {
        return new quiz_dto_1.QuizDto(utils_service_1.UtilsService.cleanNullObject(await this.quizService.startQuiz(quizId)));
    }
    async endQuiz(quizId) {
        return new quiz_dto_1.QuizDto(utils_service_1.UtilsService.cleanNullObject(await this.quizService.endQuiz(quizId)));
    }
    async activeQuiz(quizId) {
        return new quiz_dto_1.QuizDto(utils_service_1.UtilsService.cleanNullObject(await this.quizService.activeQuiz(quizId)));
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Query)(new query_transform_pipe_1.QueryTransformPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quizSearch_dto_1.QuizSearchDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, quiz_dto_1.QuizDto]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Get)(':id/start'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "startQuiz", null);
__decorate([
    (0, common_1.Get)(':id/end'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "endQuiz", null);
__decorate([
    (0, common_1.Get)(':id/active'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "activeQuiz", null);
exports.QuizController = QuizController = __decorate([
    (0, common_1.Controller)(''),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [quiz_service_1.QuizService, Object])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map
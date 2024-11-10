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
exports.QuestionController = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const questionSearch_dto_1 = require("./models/dto/questionSearch.dto");
const query_transform_pipe_1 = require("../utils/pipes/query-transform.pipe");
const question_dto_1 = require("./models/dto/question.dto");
const question_service_1 = require("./question.service");
const utils_service_1 = require("../utils/services/utils.service");
let QuestionController = class QuestionController {
    constructor(questionService, classMapper) {
        this.questionService = questionService;
        this.classMapper = classMapper;
    }
    async get(searchModel) {
        const result = await this.questionService.query(searchModel);
        return result;
    }
    async findById(id) {
        return new question_dto_1.QuestionDto(utils_service_1.UtilsService.cleanNullObject(await this.questionService.findById(id)));
    }
    async createQuestion(req, body) {
        const quiz = await this.questionService.createQuestion(body);
        return new question_dto_1.QuestionDto(utils_service_1.UtilsService.cleanNullObject(quiz));
    }
    async updateQuestion(req, body) {
        const quiz = await this.questionService.updateQuestion(body);
        return new question_dto_1.QuestionDto(utils_service_1.UtilsService.cleanNullObject(quiz));
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Query)(new query_transform_pipe_1.QueryTransformPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [questionSearch_dto_1.QuestionSearchDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, question_dto_1.QuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateQuestion", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('/question'),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [question_service_1.QuestionService, Object])
], QuestionController);
//# sourceMappingURL=question.controller.js.map
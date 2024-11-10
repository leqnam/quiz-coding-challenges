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
exports.QuestionService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../utils/constants");
const search_result_dto_1 = require("../utils/models/dtos/search-result.dto");
const search_service_1 = require("../utils/services/search.service");
const utils_service_1 = require("../utils/services/utils.service");
const typeorm_2 = require("typeorm");
const questionQueryDto_1 = require("./models/dto/questionQueryDto");
const question_entity_1 = require("./models/entities/question.entity");
const messaging_service_1 = require("../messaging/messaging.service");
let QuestionService = class QuestionService extends search_service_1.SearchService {
    constructor(questionsitory, jwtService, mapper, rabbitClient) {
        super(questionsitory);
        this.questionsitory = questionsitory;
        this.jwtService = jwtService;
        this.mapper = mapper;
        this.rabbitClient = rabbitClient;
    }
    queryBuilder(model) {
        const queryable = {};
        if (model.q) {
            if (model.exact) {
                queryable.content = model.q;
            }
            else {
                queryable.content = (0, typeorm_2.Like)(`%${model.q}%`);
            }
        }
        return queryable;
    }
    async query(model) {
        const res = await this.paginate(model);
        return new search_result_dto_1.SearchResultDto(res.pageMeta, this.mapper.mapArray(res.data, question_entity_1.Question, questionQueryDto_1.QuestionQueryDto));
    }
    async updateQuestion(dto) {
        try {
            const quizTmp = utils_service_1.UtilsService.cleanNullObject(dto);
            const quiz = this.questionsitory.create(quizTmp);
            const r = await this.questionsitory.save(quiz);
            return r;
        }
        catch (error) {
            throw new common_1.BadRequestException(`An internal error has occurred. ${constants_1.environment.env != 'production' && error.toString()}`);
        }
    }
    async createQuestion(dto) {
        delete dto.id;
        delete dto.createDate;
        delete dto.dateLastMaint;
        if (await this.getQuestion({ content: dto.content }))
            throw new common_1.ConflictException('Question is existed');
        return this.updateQuestion(dto);
    }
    async findById(id) {
        const dto = {
            id: id,
        };
        const rs = await this.getQuestion(dto);
        await this.rabbitClient.emit(null, rs);
        return rs;
    }
    async getQuestion(questionDto) {
        const question = this.questionsitory.createQueryBuilder('question');
        question
            .select('question.id', 'id')
            .addSelect('question.quizId', 'quizId')
            .addSelect('question.content', 'content')
            .addSelect('question.choices', 'choices');
        if (questionDto?.content) {
            question.where('question.content = :content', {
                content: questionDto?.content,
            });
        }
        else if (questionDto?.id) {
            question.where('question.id = :uid', { uid: questionDto?.id });
        }
        else if (questionDto?.quizId) {
            question.where('question.quizId = :quizId', {
                quizId: questionDto?.quizId,
            });
        }
        return await question.getRawOne();
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService, Object, messaging_service_1.MessagingService])
], QuestionService);
//# sourceMappingURL=question.service.js.map
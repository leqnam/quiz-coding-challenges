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
exports.QuizService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const messaging_service_1 = require("../messaging/messaging.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const question_dto_1 = require("../question/models/dto/question.dto");
const quizQueryDto_1 = require("./models/dto/quizQueryDto");
const constants_1 = require("../utils/constants");
const search_result_dto_1 = require("../utils/models/dtos/search-result.dto");
const search_service_1 = require("../utils/services/search.service");
const utils_service_1 = require("../utils/services/utils.service");
const ioredis_1 = require("ioredis");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./models/entities/quiz.entity");
let QuizService = class QuizService extends search_service_1.SearchService {
    constructor(quizRepository, jwtService, mapper, rabbitClient, redisClient) {
        super(quizRepository);
        this.quizRepository = quizRepository;
        this.jwtService = jwtService;
        this.mapper = mapper;
        this.rabbitClient = rabbitClient;
        this.redisClient = redisClient;
    }
    queryBuilder(model) {
        const queryable = {};
        if (model.q) {
            if (model.exact) {
                queryable.name = model.q;
            }
            else {
                queryable.name = (0, typeorm_2.Like)(`%${model.q}%`);
            }
        }
        return queryable;
    }
    async query(model) {
        const res = await this.paginate(model);
        return new search_result_dto_1.SearchResultDto(res.pageMeta, this.mapper.mapArray(res.data, quiz_entity_1.Quiz, quizQueryDto_1.QuizQueryDto));
    }
    async createQuiz(token, dto) {
        if (await this.getQuiz({ name: dto.name }))
            throw new common_1.ConflictException('Quiz is existed');
        try {
            delete dto.id;
            delete dto.createDate;
            delete dto.dateLastMaint;
            dto.addedBy = this.jwtService.decode(token).id;
            if (!dto.hostId) {
                dto.hostId = this.jwtService.decode(token).id;
            }
            const quizTmp = utils_service_1.UtilsService.cleanNullObject(dto);
            const quiz = this.quizRepository.create(quizTmp);
            const r = await this.quizRepository.save(quiz);
            return r;
        }
        catch (error) {
            throw new common_1.BadRequestException(`An internal error has occurred. ${constants_1.environment.env != 'production' && error.toString()}`);
        }
    }
    async startQuiz(quizId) {
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!quiz) {
            throw new common_1.ForbiddenException('Quiz not found');
        }
        if (quiz.status !== quiz_entity_1.QuizStatus.PENDING) {
            throw new common_1.ForbiddenException('Quiz has already started or ended');
        }
        quiz.status = quiz_entity_1.QuizStatus.ACTIVE;
        return await this.updateStatusAndPub(quiz);
    }
    async endQuiz(quizId) {
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!quiz) {
            throw new common_1.ForbiddenException('Quiz not found');
        }
        if (quiz.status !== quiz_entity_1.QuizStatus.ACTIVE) {
            throw new common_1.ForbiddenException('Quiz is not currently active');
        }
        quiz.status = quiz_entity_1.QuizStatus.ENDED;
        return await this.updateStatusAndPub(quiz);
    }
    async activeQuiz(quizId) {
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!quiz) {
            throw new common_1.ForbiddenException('Quiz not found');
        }
        if (quiz.status !== quiz_entity_1.QuizStatus.ENDED) {
            throw new common_1.ForbiddenException('Quiz has already started or ended');
        }
        quiz.status = quiz_entity_1.QuizStatus.PENDING;
        return await this.updateStatusAndPub(quiz);
    }
    async updateStatusAndPub(quiz) {
        const rs = await this.quizRepository.save(quiz);
        return rs;
    }
    async findById(id) {
        const dto = {
            id: id,
        };
        const rs = await this.getQuiz(dto);
        return rs;
    }
    async cacheQuiz(quizId, questions) {
        const cacheKey = `quiz:${quizId}:questions`;
        await this.redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 3600);
    }
    async getQuizFromCache(quizId) {
        const cacheKey = `quiz:${quizId}:questions`;
        const cachedQuestions = await this.redisClient.get(cacheKey);
        return cachedQuestions ? JSON.parse(cachedQuestions) : null;
    }
    async getQuiz(quizDto) {
        const quiz = this.quizRepository
            .createQueryBuilder('quiz')
            .leftJoinAndSelect('quiz.questions', 'question');
        if (quizDto?.name) {
            quiz.where('quiz.name = :name', {
                name: quizDto?.name,
            });
        }
        else if (quizDto?.id) {
            quiz.where('quiz.id = :quizId', { quizId: quizDto?.id });
        }
        const q = await quiz.getOne();
        if (!q)
            return null;
        const qid = q.id;
        const questionDtos = q.questions.map(question => utils_service_1.UtilsService.cleanNullObject(new question_dto_1.QuestionDto(question)));
        const qz = {
            id: qid,
            name: q.name,
            status: q.status,
            questions: questionDtos,
        };
        await this.cacheQuiz(qid, qz);
        qz.questions.forEach(item => {
            delete item.correctAnswer;
        });
        return qz;
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __param(4, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService, Object, messaging_service_1.MessagingService,
        ioredis_1.default])
], QuizService);
//# sourceMappingURL=quiz.service.js.map
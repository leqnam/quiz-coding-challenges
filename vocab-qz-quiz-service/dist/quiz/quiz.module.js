"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const database_module_1 = require("../database/database.module");
const messaging_module_1 = require("../messaging/messaging.module");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("../question/models/entities/question.entity");
const quiz_profile_1 = require("./quiz.profile");
const quiz_entity_1 = require("./models/entities/quiz.entity");
const quiz_controller_1 = require("./quiz.controller");
const quiz_service_1 = require("./quiz.service");
let QuizModule = class QuizModule {
};
exports.QuizModule = QuizModule;
exports.QuizModule = QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([quiz_entity_1.Quiz, question_entity_1.Question]),
            jwt_1.JwtModule.register({}),
            messaging_module_1.MessagingModule,
        ],
        controllers: [quiz_controller_1.QuizController],
        providers: [quiz_service_1.QuizService, quiz_profile_1.QuizProfile],
        exports: [quiz_service_1.QuizService],
    })
], QuizModule);
//# sourceMappingURL=quiz.module.js.map
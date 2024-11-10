"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const database_module_1 = require("../database/database.module");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./models/entities/question.entity");
const question_controller_1 = require("./question.controller");
const jwt_1 = require("@nestjs/jwt");
const question_profile_1 = require("./question.profile");
const messaging_module_1 = require("../messaging/messaging.module");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question]),
            jwt_1.JwtModule.register({}),
            messaging_module_1.MessagingModule,
        ],
        controllers: [question_controller_1.QuestionController],
        providers: [question_service_1.QuestionService, question_profile_1.QuestionProfile],
        exports: [question_service_1.QuestionService],
    })
], QuestionModule);
//# sourceMappingURL=question.module.js.map
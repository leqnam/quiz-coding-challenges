"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const classes_1 = require("@automapper/classes");
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const constants_1 = require("@nestjs/core/constants");
const quiz_module_1 = require("./quiz/quiz.module");
const http_exception_filter_1 = require("./utils/filters/http-exception.filter");
const app_middleware_1 = require("./utils/middleware/app.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./database/database.module");
const question_module_1 = require("./question/question.module");
const redis_module_1 = require("./redis/redis.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(app_middleware_1.ApplicationMiddleware)
            .forRoutes({ path: '(*)', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)(),
            }),
            database_module_1.DatabaseModule,
            quiz_module_1.QuizModule,
            question_module_1.QuestionModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: constants_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
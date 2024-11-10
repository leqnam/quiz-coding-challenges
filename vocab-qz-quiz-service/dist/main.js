"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./utils/constants");
const response_interceptor_1 = require("./utils/interceptor/response.interceptor");
const logging_interceptor_1 = require("./utils/interceptor/logging.interceptor");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const port = constants_1.environment.port;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_1.Reflector);
    app.enableShutdownHooks();
    app.enableVersioning();
    app.setGlobalPrefix('/vocab-quiz/quiz', {});
    app.useGlobalInterceptors(new response_interceptor_1.TransformInterceptor());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    const logger = new common_1.Logger('NestApplication');
    await app.listen(port, async () => logger.log(`
      ${constants_1.banner}
      Server initialized in ${constants_1.environment.env} mode
      ${await app.getUrl()} 
    `));
}
bootstrap();
//# sourceMappingURL=main.js.map
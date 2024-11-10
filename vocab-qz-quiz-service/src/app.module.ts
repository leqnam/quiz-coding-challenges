import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core/constants';
import { QuizModule } from '@quiz/quiz.module';
import { HttpExceptionFilter } from '@utils/filters/http-exception.filter';
import { ApplicationMiddleware } from '@utils/middleware/app.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { QuestionModule } from '@question/question.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    QuizModule,
    QuestionModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApplicationMiddleware)
      .forRoutes({ path: '(*)', method: RequestMethod.ALL });
  }
}

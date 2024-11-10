import { AnswerModule } from '@answer/answer.module';
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
import { HttpExceptionFilter } from '@utils/filters/http-exception.filter';
import { ApplicationMiddleware } from '@utils/middleware/app.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    AnswerModule,
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

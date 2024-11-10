import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';
import { ParticipationModule } from './participation/participation.module';
import { ApplicationMiddleware } from '@utils/middleware/app.middleware';
import { APP_FILTER } from '@nestjs/core/constants';
import { HttpExceptionFilter } from '@utils/filters/http-exception.filter';
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
    ParticipationModule,
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

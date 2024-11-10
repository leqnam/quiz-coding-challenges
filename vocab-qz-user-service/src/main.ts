import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { banner, environment } from '@utils/constants';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TransformInterceptor } from '@utils/interceptor/response.interceptor';
import { LoggingInterceptor } from '@utils/interceptor/logging.interceptor';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';

async function bootstrap() {
  const port = environment.port;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  app.enableShutdownHooks();
  app.enableVersioning();
  app.setGlobalPrefix('/vocab-quiz/user', {
    // exclude: [
    //   { path: 'health', method: RequestMethod.GET },
    //   { path: 'echo', method: RequestMethod.GET },
    //   { path: '', method: RequestMethod.GET },
    // ],
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  const logger = new Logger('NestApplication');
  await app.listen(port, async () =>
    logger.log(`
      ${banner}
      Server initialized in ${environment.env} mode
      ${await app.getUrl()} 
    `),
  );
}
bootstrap();

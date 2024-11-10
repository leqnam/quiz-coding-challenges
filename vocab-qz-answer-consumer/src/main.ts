import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { banner, environment } from '@utils/constants';
import { LoggingInterceptor } from '@utils/interceptor/logging.interceptor';
import { TransformInterceptor } from '@utils/interceptor/response.interceptor';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = environment.port;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ, // or any other transport (Kafka, Redis, etc.)
    options: {
      urls: [environment.rabbitmq],
      queue: environment.rabbitmqName,
      noAck: false,
      queueOptions: {
        durable: true,
        arguments: {
          'x-message-ttl': environment.rabbitmqTtl, // Message TTL in milliseconds
        },
      },
    },
  });
  await app.startAllMicroservices();

  const reflector = app.get(Reflector);
  app.enableShutdownHooks();
  app.enableVersioning();
  app.setGlobalPrefix('/vocab-quiz/answer', {
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

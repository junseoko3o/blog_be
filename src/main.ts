import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/guard/jwt-auth.guard';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { RedisIoAdapter } from './chat/redis.adapter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'debug'],
  });
  const reflector = app.get(Reflector);  
  app.useGlobalGuards(
    new AuthGuard(reflector),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // redisConnectSession(app);
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser()); 
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();

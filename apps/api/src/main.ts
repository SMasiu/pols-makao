import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.enableCors({
    origin: process.env['CLIENT_URL'],
    credentials: true,
  });

  await app.listen(process.env['API_PORT']);
};

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS configuration using ConfigService
  app.enableCors({
    origin:
      configService.get<string>('FRONTEND_URL') || 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // Use port from environment
  const port = configService.get<string>('PORT') || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application running on port ${port}`);
}

bootstrap();

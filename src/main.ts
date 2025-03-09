import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); // Get ConfigService instance

  // CORS configuration using ConfigService
  app.enableCors({
    origin: configService.get('FRONTEND_URL') || 'http://localhost:3001',
    credentials: true,
  });

  // Use port from environment
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application running on port ${port}`);
}

bootstrap();

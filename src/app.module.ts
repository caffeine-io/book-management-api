import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Book } from './books/book.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Load .env file
      isGlobal: true, // Make ConfigService available globally
      validate: (config) => {
        const logger = new Logger('ConfigValidation');
        if (!config.AUTH0_DOMAIN) {
          logger.error('Missing environment variable: AUTH0_DOMAIN');
          throw new Error('AUTH0_DOMAIN is required');
        }
        if (!config.AUTH0_ISSUER_URL) {
          logger.error('Missing environment variable: AUTH0_ISSUER_URL');
          throw new Error('AUTH0_ISSUER_URL is required');
        }
        if (!config.AUTH0_AUDIENCE) {
          logger.error('Missing environment variable: AUTH0_AUDIENCE');
          throw new Error('AUTH0_AUDIENCE is required');
        }
        if (!config.DATABASE_URL) {
          logger.error('Missing environment variable: DATABASE_URL');
          throw new Error('DATABASE_URL is required');
        }
        return config;
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_URL'),
        entities: [Book],
        synchronize: true,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}

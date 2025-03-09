import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Book } from './books/book.entity'; // Import the Book entity

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      // Database configuration
      type: 'sqlite',
      database: 'books.db',
      entities: [Book],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

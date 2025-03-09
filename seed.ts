import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { BooksService } from './src/books/books.service';
import { CreateBookInput } from './src/books/dto/create-book.input';

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const booksService = app.get(BooksService);

    // Truncate existing data
    await booksService.truncate();

    const seedData: CreateBookInput[] = [
      {
        name: '1984',
        description: 'Dystopian novel by George Orwell',
      },
      {
        name: 'To Kill a Mockingbird',
        description: 'Pulitzer Prize-winning novel by Harper Lee',
      },
      {
        name: 'The Great Gatsby',
        description: 'Tragic love story by F. Scott Fitzgerald',
      },
      {
        name: 'Pride and Prejudice',
        description: 'Classic romance novel by Jane Austen',
      },
      {
        name: 'The Catcher in the Rye',
        description: 'Controversial novel by J.D. Salinger',
      },
      {
        name: 'The Hobbit',
        description: 'Fantasy adventure by J.R.R. Tolkien',
      },
      {
        name: "Harry Potter and the Philosopher's Stone",
        description: 'First book in the Harry Potter series',
      },
      {
        name: 'The Lord of the Rings',
        description: 'Epic fantasy trilogy by J.R.R. Tolkien',
      },
      {
        name: 'Moby-Dick',
        description: 'Epic sea story by Herman Melville',
      },
      {
        name: 'War and Peace',
        description: 'Historical novel by Leo Tolstoy',
      },
      {
        name: 'The Divine Comedy',
        description: 'Allegorical poem by Dante Alighieri',
      },
      {
        name: 'The Odyssey',
        description: 'Ancient Greek epic poem by Homer',
      },
      {
        name: 'Don Quixote',
        description: 'Classic Spanish novel by Miguel de Cervantes',
      },
      {
        name: 'Ulysses',
        description: 'Modernist novel by James Joyce',
      },
      {
        name: 'The Brothers Karamazov',
        description: 'Philosophical novel by Fyodor Dostoevsky',
      },
      {
        name: 'Crime and Punishment',
        description: 'Psychological novel by Fyodor Dostoevsky',
      },
      {
        name: 'The Iliad',
        description: 'Ancient Greek epic poem by Homer',
      },
      {
        name: 'The Republic',
        description: 'Philosophical dialogue by Plato',
      },
      {
        name: 'Frankenstein',
        description: 'Gothic novel by Mary Shelley',
      },
      {
        name: 'Dracula',
        description: 'Gothic horror novel by Bram Stoker',
      },
    ];

    // Seed data
    await booksService.bulkCreate(seedData);
    console.log(`🌱 Successfully seeded ${seedData.length} books`);

    await app.close();
    console.log('🌱 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

bootstrap();

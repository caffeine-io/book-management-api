import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Logger } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    this.logger.log('Fetching all books');
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      this.logger.error(`Book with ID ${id} not found`);
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(createBookInput: CreateBookInput): Promise<Book> {
    this.logger.log('Creating new book');
    const book = this.booksRepository.create(createBookInput);
    return this.booksRepository.save(book);
  }
  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    await this.findOne(id);
    this.logger.log(`Updating book ID ${id}`);
    await this.booksRepository.update(id, updateBookInput);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    this.logger.log(`Deleting book ID ${id}`);
    await this.booksRepository.delete(id);
  }

  // seed related methods
  async bulkCreate(books: CreateBookInput[]): Promise<void> {
    this.logger.log(`Bulk inserting ${books.length} books`);
    await this.booksRepository.save(books);
  }

  async truncate(): Promise<void> {
    await this.booksRepository.delete({});
    this.logger.log('Database truncated');
  }
}

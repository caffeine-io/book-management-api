import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => [Book])
  @UseGuards(AuthGuard)
  async books() {
    return this.booksService.findAll();
  }

  @Query(() => Book)
  @UseGuards(AuthGuard)
  async book(@Args('id', { type: () => ID }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.booksService.create(input);
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateBookInput,
  ) {
    return this.booksService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async deleteBook(@Args('id', { type: () => ID }) id: number) {
    await this.booksService.delete(id);
    return true;
  }
}

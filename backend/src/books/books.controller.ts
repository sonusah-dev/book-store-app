import { BooksService } from './books.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  /**
   * POST REQUEST FOR ADDING NEW BOOK
   * Author: Sonu Sah
   * @param title takes title of the book
   * @param author takes author of the book
   * @param price takes price of the book
   * @param rating takes optional rating of book
   * @returns the book object craeted in mongodb databse
   */
  @Post()
  addNewBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('price') price: number,
    @Body('rating') rating?: number,
    @Body('image') image?: string,
  ) {
    return this.bookService.addNewBook(title, author, price, rating, image);
  }

  /**
   * GET REQUEST FOR RETRIEVING ALL THE BOOKS RECORDS
   * Author: Sonu Sah
   * @returns all the books are available in the database
   */
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  /**
   * GET REQUEST FOR FINDING BOOK BY ID
   * Author: Sonu Sah
   * @param id takes ID to find the particular book from the list of books
   * @returns the books information whose ID was given
   */
  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  /**
   * PUT REQUEST FOR UPDATING SPECIFIC BOOK INFORMATION
   * Author: Sonu Sah
   * @param id takes ID as a params to find book which is to be updated
   * @param title new title value that need to be updated
   * @param author new author value that need to be updated
   * @param price new price value that need to be updated
   * @param rating new rating value that need to be updated
   * @returns the book with the updated information
   */
  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('price') price: number,
    @Body('rating') rating?: number,
    @Body('image') image?: string,
  ) {
    return this.bookService.updateBook(id, title, author, price, rating, image);
  }

  /**
   * DELETE REQUEST FOR DELETING BOOK FROM THE LIST
   * Author: Sonu Sah
   * @param id takes ID as a params to find and delete specific book from the list
   * @returns flag that indicated data deleted or not
   */
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}

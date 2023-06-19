import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument } from './books.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
  ) {}

  /**
   * METHOD FOR ADDING NEW BOOK
   * Author: Sonu Sah
   * @param title takes title of the book
   * @param author takes author of the book
   * @param price takes price of the book
   * @param rating takes optional rating of book
   * @returns the book object craeted in mongodb databse
   */
  async addNewBook(
    title: string,
    author: string,
    price: number,
    rating: number,
    image: string,
  ): Promise<BookDocument> {
    const newBook = new this.bookModel({ image, title, author, price, rating });
    return newBook.save();
  }

  /**
   * METHOD FOR RETRIEVING ALL THE BOOKS RECORDS
   * Author: Sonu Sah
   * @returns all the books are available in the database
   */
  async getAllBooks(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  /**
   * METHOD FOR FINDING BOOK BY ID
   * Author: Sonu Sah
   * @param id takes ID to find the particular book from the list of books
   * @returns the books information whose ID was given
   */
  async getBookById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).exec();
  }

  /**
   * METHOD FOR UPDATING SPECIFIC BOOK INFORMATION
   * Author: Sonu Sah
   * @param id takes ID as a params to find book which is to be updated
   * @param updatedTitle new title value that need to be updated
   * @param updatedAuthor new author value that need to be updated
   * @param updatedPrice new price value that need to be updated
   * @param updatedRating new rating value that need to be updated
   * @returns the book with the updated information
   */
  async updateBook(
    id: string,
    updatedTitle: string,
    updatedAuthor: string,
    updatedPrice: number,
    updatedRating: number,
    updatedImage: string,
  ): Promise<BookDocument> {
    try {
      const existingBook = await this.bookModel.findById(id).exec();
      if (!existingBook) {
        return;
      } else {
        existingBook.image = updatedImage ?? existingBook.image;
        existingBook.title = updatedTitle ?? existingBook.title;
        existingBook.author = updatedAuthor ?? existingBook.author;
        existingBook.price = updatedPrice ?? existingBook.price;
        existingBook.rating = updatedRating ?? existingBook.rating;
        return existingBook.save();
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * METHOD FOR DELETING BOOK FROM THE LIST
   * Author: Sonu Sah
   * @param id takes ID as a params to find and delete specific book from the list
   * @returns flag that indicated data deleted or not
   */
  async deleteBook(id: string) {
    return this.bookModel.deleteOne({ _id: id }).exec();
  }
}

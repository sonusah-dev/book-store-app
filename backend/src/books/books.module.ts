import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BookSchema } from './books.schema';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}

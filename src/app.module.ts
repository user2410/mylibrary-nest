import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookController } from "./domain/book/book.controller";
import { BookModule } from "./domain/book/book.module";
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './domain/author/author.module';
import { CategoryModule } from './domain/category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), BookModule, PrismaModule, AuthorModule, CategoryModule],
  controllers: [AppController, BookController],
  providers: [AppService],
})
export class AppModule {}

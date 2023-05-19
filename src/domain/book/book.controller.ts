import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { QueryDto, SearchQueryPipe } from "src/common/pipes/search-query.pipe";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookEntity } from "./entities/book.entity";

@Controller("books")
@ApiTags("books")
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  @ApiOperation({ summary: 'Create a new book record, create new authors and categories if not exists' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  @UsePipes(new SearchQueryPipe())
  findAll(
    @Query() query: QueryDto
  ) {
    // return query;
    // const filters: object = {}
    // return filters;
    // query.filters = filters;
    return this.bookService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: BookEntity })
  update(@Param("id", ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}

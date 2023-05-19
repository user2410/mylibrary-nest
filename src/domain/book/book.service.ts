import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@prisma/client";
import { QueryDto } from "src/common/pipes/search-query.pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService {

  constructor(private prisma: PrismaService) { }

  create(createBookDto: CreateBookDto) {
    const { isbn, title, language, publishDate, publisher, pageCount, width, length, description, coverUrl, quantity, price, authors, cats } = createBookDto
    return this.prisma.book.create({
      data: {
        isbn, title, language, publishDate, publisher, pageCount, width, length, description, coverUrl, quantity, price,
        authors: {
          create: authors.map((item) => (
            {
              role: item.role,
              author: {
                connect: {
                  id: item.authorId
                  // where: { name: item.name },
                  // create: {
                  //   name: item.name,
                  //   imageUrl: item.imageUrl,
                  //   about: item.about
                  // }
                }
              }
            }
          )),
        },
        cats: {
          connectOrCreate: cats?.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      }
    })
  }

  async findAll(query: QueryDto) {
    const { offset, limit, sort, order } = query;
    const filters: object = {}
    for (const filter of Object.keys(query.filters)) {
      switch (filter) {
        case 'title':
          filters['title'] = {
            contains: query.filters['title']
          };
          break;
        case 'authors': case 'cats':
          filters[filter] = {
            some: {
              name: {
                contains: query.filters[filter]
              }
            }
          };
          break;
        case 'language': case 'publisher':
          filters[filter] = query.filters[filter]
          break;
      }
    }

    const total = await this.prisma.book.count({ where: filters });

    const books = await this.prisma.book.findMany({
      where: filters,
      orderBy: sort ? {
        [sort]: order,
      } : undefined,
      skip: offset,
      take: limit,
    });

    return { total, books };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        authors: true,
        cats: true
      }
    });
    if (!book) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    const authorNames = updateBookDto.authors;
    const categoryNames = updateBookDto.cats;

    const updatedCategories: Category[] = [];

    // Update or create Authors
    const authorConnect = [];
    if (authorNames) {
      for (const authorDto of authorNames) {
        authorConnect.push({authorId: authorDto.authorId, role: authorDto.role});
      }
    }

    // Update or create Categories
    if (categoryNames) {
      for (const name of categoryNames) {
        let category = await this.prisma.category.findUnique({ where: { name } });
        if (!category) {
          category = await this.prisma.category.create({ data: { name } });
        }
        updatedCategories.push(category);
      }
    }

    const categoryConnect = updatedCategories.map((category) => ({ id: category.id }));

    await this.prisma.book.update({
      where: { id },
      data: {
        ...updateBookDto,
        authors: authorNames ? { 
          deleteMany: {},
          create: authorConnect
        } : undefined,
        cats: { set: categoryConnect },
      },
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {

  constructor(private prisma: PrismaService) { }

  create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({ data: createAuthorDto });
  }

  findByName(name: string) {
    return this.prisma.author.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with id=${id} not found`);
    }
    return author;
  }

  async findBooks(authorId: number) {
    const data = await this.prisma.author.findUnique({
      where: { id: authorId },
      include: { books: true },
    });
    return data.books;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.findOne(id);
    return await this.prisma.author.update({
      where: { id },
      data: updateAuthorDto
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findByName(name: string) {
    return this.prisma.category.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
  }

  async findBooks(id: number) {
    const data = await this.prisma.category.findUnique({
      where: { id },
      include: { books: true },
    });
    return data.books;
  }

  async findOne(id: number) {
    const cat = await this.prisma.category.findUnique({ where: { id } });
    if(!cat) {
      throw new NotFoundException(`Category with id=${id} is not available`);
    }
    return cat;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}

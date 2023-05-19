import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsISBN, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";
import { AuthorEntity } from "src/domain/author/entities/author.entity";
import { CategoryEntity } from "src/domain/category/entities/category.entity";

export class BookEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'ISBN-13 standard',
    example: '978-1496742711'
  })
  @IsNotEmpty()
	@IsISBN()
	isbn: string;

  @ApiProperty({
    description: 'Book title',
    example: ''
  })
  @IsNotEmpty()
	@IsString()
	title: string;

  @ApiProperty({
    description: 'List of authors',
    example: ['Adam', 'Echo', 'Delta']
  })
  authors: AuthorEntity[]

  @ApiProperty({
    description: 'List of categories',
    example: ['Children\'s Books', 'Education & Teaching'],
  })
  cats: CategoryEntity[]

  @ApiProperty({
    description: 'The language in which the book is written',
    example: 'English'
  })
  language: string;

  @ApiProperty({
    
  })
  @Type(() => Date)
	@Transform(({ value }) => new Date(value))
	@IsDate()
	publishDate: Date;

  @ApiProperty({
    description: 'The publisher of the book',
    example: 'Independently published'
  })
  @IsString()
  publisher: string;

  @ApiProperty({
    description: 'Paperback page counts',
    example: 612
  })
  @IsNumber()
  pageCount: number;

  @ApiProperty({
    description: 'Horizontal measure of the book in inches',
    example: 10
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'Vertical measure of the book in inches',
    example: 8
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'The description of the book',
    example: 'He\'s planned for anything and everything that can go wrong.'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'URL to cover image of the book',
    example: 'https://firebasestorage.googleapis.com/v0/b/web20221-494f6.appspot.com/o/blank_cover.png?alt=media&token=2a5aab82-e910-49c7-8a7e-d4eb03db324d'
  })
  @IsUrl()
  coverUrl?: string;
  
  @ApiProperty({
    description: 'Quantity of copies in stock',
    example: 30
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Price of the book in USD',
    example: 14.99
  })
  @IsNumber()
  price: number;

  @ApiProperty({ 
    required: false,
    nullable: true,
    description: 'View counts of the book',
    example: 3000
  })
  @IsNumber()
  views: number

  @ApiProperty({
    description: 'Date of the book record creation',
    example: '2023-02-01'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of the book record creation',
    example: '2023-03-20'
  })
  updatedAt: Date;
}

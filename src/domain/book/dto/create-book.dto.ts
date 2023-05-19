import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BookEntity } from "../entities/book.entity";
import { BookAuthorDto } from "./book-author.dto";

export class CreateBookDto extends OmitType(BookEntity, ['id', 'authors', 'cats', 'views', 'updatedAt', 'createdAt']) {
	// @ApiProperty({
  //   description: 'List of authors',
  //   example: ['Adam', 'Echo', 'Delta']
  // })
	@IsNotEmpty()
	@ValidateNested({each: true})
	authors: BookAuthorDto[];

	// @ApiProperty({
  //   description: 'List of categories',
  //   example: ['Children\'s Books', 'Education & Teaching'],
  // })
	@IsNotEmpty()
	@IsString({each: true})
	cats: string[];
}
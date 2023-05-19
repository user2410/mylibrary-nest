import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "src/domain/book/entities/book.entity";
import { AuthorEntity } from "./author.entity";

export class BookAuthorEntity {
	@ApiProperty()
	book: BookEntity

	@ApiProperty()
	author: AuthorEntity
	
	@ApiProperty()
	role: string
}
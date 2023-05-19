import { ApiProperty } from "@nestjs/swagger";
import { BookEntity } from "src/domain/book/entities/book.entity";

export class AuthorEntity {
	@ApiProperty()
  id: number;

	@ApiProperty({
		description: 'Name of the author',
		example: ''
	})
	name: string;

	@ApiProperty({
		description: 'Image URL of the author',
		example: ''
	})
	imageUrl?: string

	@ApiProperty({
		description: 'Author bio',
		example: ''
	})
	about?: string

	@ApiProperty()
	books: BookEntity[]
}

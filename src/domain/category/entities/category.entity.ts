import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { BookEntity } from "src/domain/book/entities/book.entity";

export class CategoryEntity {
	@ApiProperty()
	@IsNumber()
	id: number;
	
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	books: BookEntity[]
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BookAuthorDto {
	@IsNotEmpty()
	@IsNumber()
	authorId: number

	@IsNotEmpty()
	@IsString()
	role: string
}
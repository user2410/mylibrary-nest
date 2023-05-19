import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BookAuthorDto } from './book-author.dto';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(OmitType(CreateBookDto, ['authors'])) {
	@IsOptional()
	@IsString({each: true})
	authors: BookAuthorDto[]
}

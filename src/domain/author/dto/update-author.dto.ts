import { OmitType } from '@nestjs/swagger';
import { AuthorEntity } from '../entities/author.entity';

export class UpdateAuthorDto extends OmitType(AuthorEntity, ['id', 'name', 'books']) {}

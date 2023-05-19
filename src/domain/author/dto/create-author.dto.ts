import { OmitType } from "@nestjs/swagger";
import { AuthorEntity } from "../entities/author.entity";

export class CreateAuthorDto extends OmitType(AuthorEntity, ['id', 'books']) {}

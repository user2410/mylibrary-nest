import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class PaginationQueryDto {
	static DEFAULT_LIMIT = 10;
	static DEFAULT_OFFSET = 0;

	@IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number = PaginationQueryDto.DEFAULT_LIMIT;


  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number = PaginationQueryDto.DEFAULT_OFFSET;
}
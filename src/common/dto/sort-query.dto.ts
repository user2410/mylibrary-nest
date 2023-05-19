import { IsOptional, IsString, Matches } from "class-validator";

export class SortQueryDto {
	@IsOptional()
	@IsString()
	sort: string

	@IsOptional()
	@IsString()
	@Matches(/^(ASC|DESC)$/, { message: "Order must be 'ASC' or 'DESC'" })
  order: string;
}
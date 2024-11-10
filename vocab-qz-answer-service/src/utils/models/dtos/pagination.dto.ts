import { IsNumberString, IsOptional } from 'class-validator';
export interface IPagination {
  skip: number;
  page: number;
  limit: number;
}

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  size?: number;

  totalPages?: number;

  totalRows?: number;
}

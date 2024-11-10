import { PaginationDto } from './pagination.dto';

export class BaseResponseDto {
  timestamp: string;
  responseBody?: any;
  pageMeta?: PaginationDto;
}

export class BadRequestResponseDto extends BaseResponseDto {
  // responseCode: string;
  statusCode: string;
  message: string;
}

export class OkResponseDto extends BaseResponseDto {
  // responseCode: string;
  statusCode: string;
  message?: string;
  pageMeta?: PaginationDto;
}

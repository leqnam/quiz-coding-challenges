import { PaginationDto } from './pagination.dto';
export declare class BaseResponseDto {
    timestamp: string;
    responseBody?: any;
    pageMeta?: PaginationDto;
}
export declare class BadRequestResponseDto extends BaseResponseDto {
    statusCode: string;
    message: string;
}
export declare class OkResponseDto extends BaseResponseDto {
    statusCode: string;
    message?: string;
    pageMeta?: PaginationDto;
}

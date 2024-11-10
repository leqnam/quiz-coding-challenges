export interface IPagination {
    skip: number;
    page: number;
    limit: number;
}
export declare class PaginationDto {
    page?: number;
    size?: number;
    totalPages?: number;
    totalRows?: number;
}

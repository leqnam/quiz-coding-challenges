import { PageMetaDto } from '@utils/models/dtos/page-meta.dto';
export declare class SearchResultDto<T> {
    pageMeta: PageMetaDto;
    data: T[];
    constructor(pageMeta: PageMetaDto, data: T[]);
}

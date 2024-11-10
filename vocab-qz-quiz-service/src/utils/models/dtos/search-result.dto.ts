import { PageMetaDto } from '@utils/models/dtos/page-meta.dto';

export class SearchResultDto<T> {
  pageMeta: PageMetaDto;
  data: T[];

  constructor(pageMeta: PageMetaDto, data: T[]) {
    this.pageMeta = pageMeta;
    this.data = data;
  }
}

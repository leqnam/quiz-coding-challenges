import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
export declare abstract class SearchService<T extends AbstractEntity, S extends AbstractSearchDto<T>> {
    protected repository: Repository<T>;
    protected constructor(repository: Repository<T>);
    protected abstract queryBuilder(model: S): FindOptionsWhere<T>;
    protected paginate(model: S): Promise<SearchResultDto<T>>;
}

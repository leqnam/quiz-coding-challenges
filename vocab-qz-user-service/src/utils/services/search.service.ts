import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { PageMetaDto } from '@utils/models/dtos/page-meta.dto';

export abstract class SearchService<
  T extends AbstractEntity,
  S extends AbstractSearchDto<T>,
> {
  protected constructor(
    @InjectRepository(AbstractEntity) protected repository: Repository<T>,
  ) {}

  protected abstract queryBuilder(model: S): FindOptionsWhere<T>;

  protected async paginate(model: S) {
    const itemCount = await this.repository.countBy(this.queryBuilder(model));
    const data = await this.repository.find({
      where: this.queryBuilder(model),
      skip: (model.page - 1) * model.take,
      take: model.take,
      order:
        model.orderBy || ({ dateLastMaint: 'DESC' } as FindOptionsOrder<T>),
    });
    const res = new SearchResultDto<T>(
      new PageMetaDto({
        pageOptionsDto: {
          take: model.take,
          page: model.page,
          skip: (model.page - 1) * model.take,
        },
        itemCount,
      }),
      data,
    );
    return res;
  }
}

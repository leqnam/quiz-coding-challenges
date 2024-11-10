import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Inject,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipationQueryDto } from '@participation/models/dto/userquizQueryDto';
import { ParticipationSearchDto } from '@participation/models/dto/userquizSearch.dto';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import Redis from 'ioredis';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ParticipationDto } from './models/dto/userquiz.dto';
import { Participation } from './models/entities/userquiz.entity';

@Injectable()
export class ParticipationService extends SearchService<
  Participation,
  ParticipationSearchDto
> {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    super(participationRepository);
  }

  protected queryBuilder(
    model: ParticipationSearchDto,
  ): FindOptionsWhere<Participation> {
    const queryable = {} as FindOptionsWhere<Participation>;
    if (model.q) {
      if (model.exact) {
        queryable.userId = model.q;
      } else {
        queryable.quizId = Like(`%${model.q}%`);
      }
    }
    return queryable;
  }

  public async query(model: ParticipationSearchDto) {
    const res = await this.paginate(model);
    return new SearchResultDto<ParticipationQueryDto>(
      res.pageMeta,
      this.mapper.mapArray(res.data, Participation, ParticipationQueryDto),
    );
  }

  public async getParticipation(
    dto: ParticipationDto,
  ): Promise<Participation | any> {
    const p = this.participationRepository.createQueryBuilder('participation');
    p.select('participation.id', 'id')
      .addSelect('participation.userId', 'userId')
      .addSelect('participation.score', 'score')
      .addSelect('participation.userName', 'userName')
      .addSelect('participation.quizName', 'quizName')
      .addSelect('participation.score', 'score')
      .addSelect('participation.quizId', 'quizId');
    if (dto?.userId) {
      p.where('participation.userId = :userId', {
        userId: dto?.userId,
      });
    } else if (dto?.quizId) {
      p.where('participation.quizId = :quizId', { quizId: dto?.quizId });
    } else if (dto?.id) {
      p.where('participation.id = :uid', { uid: dto?.id });
    }
    return await p.getRawOne();
  }
}

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipationQueryDto } from '@participation/models/dto/userquizQueryDto';
import { ParticipationSearchDto } from '@participation/models/dto/userquizSearch.dto';
import { environment } from '@utils/constants';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ParticipationDto } from './models/dto/userquiz.dto';
import { Participation } from './models/entities/userquiz.entity';
import { httpGet } from '@utils/services/axios.service';
import { constructUrl } from '@utils/helper';
import { MessagingService } from '@messaging/messaging.service';
import Redis from 'ioredis';

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
    private rabbitClient: MessagingService,
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

  public async joinQuiz(
    token: string,
    dto: ParticipationDto,
  ): Promise<ParticipationDto> {
    const userId = this.jwtService.decode(token).id;
    const quizId = dto.quizId;
    // Check if Quiz is still available
    try {
      const data = await httpGet(
        constructUrl(environment.quiz, '/v1/:quizId', { quizId }),
      );
      console.log('Data:', data);
      if (data.statusCode != '200' || data.responseBody.status == 'ended')
        throw new BadRequestException(`Quiz has ended`);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
    // Check if user has already joined the Quiz
    if (
      await this.getParticipation({
        userId: userId,
        quizId: dto.quizId,
      })
    )
      throw new ConflictException('Already joined this Quiz');

    // Register the user to the Quiz
    try {
      const p = this.participationRepository.create({
        userId: userId,
        quizId: dto.quizId,
      });
      const result = await this.participationRepository.save(p);
      return result as ParticipationDto;
    } catch (error) {
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
  }

  public async updateScore(data: any) {
    console.log('data', data);
    // Update point to score
    const participation = this.getParticipation({
      userId: data.userId,
      quizId: data.quizId,
    });
    participation.then(async p => {
      p.score = p.score + data.point;
      try {
        await this.participationRepository.save(p);
      } catch (error) {
        throw new BadRequestException(
          'An internal error has occurred.' + error,
        );
      }
    });
    // Get all participa to stoge in Redis and pulish MQ to let leaderboard know
    const allpart = this.participationRepository.find();
    allpart.then(a => {
      this.cacheQuiz(data.quizId, a);
      this.rabbitClient.emit(
        `${environment.rabbitmqName}_leaderboard`,
        'updated',
      );
    });
  }

  private async cacheQuiz(quizId: string, questions: any): Promise<void> {
    const cacheKey = `quiz:${quizId}:leaderboard`;
    await this.redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 3600);
  }

  async updateParticipation(dto: ParticipationDto): Promise<ParticipationDto> {
    if (!dto) {
      throw new BadRequestException('Missing data');
    }
    const p = await this.getParticipation({
      userId: dto.userId,
      quizId: dto.quizId,
    });
    if (!p) throw new NotFoundException('You have not joined this Quiz');
    // Sum the score here

    try {
      const rt = await this.participationRepository.save(p);
      return rt;
    } catch (error) {
      throw new BadRequestException('An internal error has occurred.' + error);
    }
  }

  public async getParticipation(
    dto: ParticipationDto,
  ): Promise<Participation | any> {
    const p = this.participationRepository.createQueryBuilder('participation');
    p.select('participation.id', 'id')
      .addSelect('participation.userId', 'userId')
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

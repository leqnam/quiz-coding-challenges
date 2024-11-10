import { AnswerQueryDto } from '@answer/models/dto/answerQueryDto';
import { AnswerSearchDto } from '@answer/models/dto/answerSearch.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { MessagingService } from '@messaging/messaging.service';
import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { environment } from '@utils/constants';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { DateService } from '@utils/services/date.service';
import { SearchService } from '@utils/services/search.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { AnswerDto } from './models/dto/answer.dto';
import { Answer } from './models/entities/answer.entity';

@Injectable()
export class AnswerService extends SearchService<Answer, AnswerSearchDto> {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
    private dateService: DateService,
    private rabbitClient: MessagingService,
  ) {
    super(answerRepository);
  }

  protected queryBuilder(model: AnswerSearchDto): FindOptionsWhere<Answer> {
    const queryable = {} as FindOptionsWhere<Answer>;
    if (model.q) {
      if (model.exact) {
        queryable.questionId = model.q;
      } else {
        queryable.questionId = Like(`%${model.q}%`);
      }
    }
    return queryable;
  }

  public async query(model: AnswerSearchDto) {
    const res = await this.paginate(model);
    return new SearchResultDto<AnswerQueryDto>(
      res.pageMeta,
      this.mapper.mapArray(res.data, Answer, AnswerQueryDto),
    );
  }

  public async createAnswer(token: string, dto: AnswerDto): Promise<AnswerDto> {
    // Check if question is active to accept answer
    // Chech if quiz is still active
    // Using MQ? => Once Participan join a Quiz
    // => Load all Question according to the Quiz to MQ
    // => Ansert Service read from MQ by key

    // Check if already answered
    if (await this.getAnswer({ questionId: dto.questionId }))
      throw new ConflictException('Already Answer');

    try {
      const userId = this.jwtService.decode(token).id;
      const quizId = dto.quizId;
      const questionId = dto.questionId;
      // const tmp = UtilsService.cleanNullObject(dto);
      const currentDate = new Date().toISOString();
      const message = {
        userId,
        quizId,
        questionId,
        userAnswer: dto.userAnswer,
        createDate: currentDate,
      };
      const userAnswer = this.answerRepository.create(message);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ...result } = userAnswer;

      // Emit the answer checking message to RabbitMQ
      // const routingKey = `answer_quiz_${userId}_${quizId}`;
      await this.rabbitClient.emit(null, message);
      // Save userAnswer
      await this.answerRepository.save(userAnswer);
      return result as AnswerDto;
    } catch (error) {
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
  }

  // Private: Get
  public async getAnswer(dto: AnswerDto): Promise<Answer | any> {
    const a = this.answerRepository.createQueryBuilder('answer');
    a.select('answer.id', 'id')
      .addSelect('answer.userId', 'userId')
      .addSelect('answer.quizId', 'quizId')
      .addSelect('answer.questionId', 'questionId')
      .addSelect('answer.userAnswer', 'userAnswer')
      .addSelect('answer.point', 'point')
      .addSelect('answer.createDate', 'createDate')
      .addSelect('answer.dateLastMaint', 'dateLastMaint');
    if (dto?.userId) {
      a.where('answer.userId = :userId', {
        userId: dto?.userId,
      });
    } else if (dto?.id) {
      a.where('answer.id = :uid', { uid: dto?.id });
    } else if (dto?.quizId) {
      a.where('answer.quizId = :quizId', { quizId: dto?.quizId });
    } else if (dto?.questionId) {
      a.where('answer.questionId = :qid', { qid: dto?.questionId });
    }
    return await a.getRawOne();
  }
}

import { AnswerQueryDto } from '@answer/models/dto/answerQueryDto';
import { AnswerSearchDto } from '@answer/models/dto/answerSearch.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { DateService } from '@utils/services/date.service';
import { SearchService } from '@utils/services/search.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Answer } from './models/entities/answer.entity';
import Redis from 'ioredis';
import { AnswerDto } from './models/dto/answer.dto';
import { MessagingService } from '@messaging/messaging.service';

@Injectable()
export class AnswerService extends SearchService<Answer, AnswerSearchDto> {
  constructor(
    @InjectRepository(Answer) private answerRepository: Repository<Answer>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
    private dateService: DateService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
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

  public async validateAnswer(data: AnswerDto) {
    console.log('data', data);
    // Get list of questions from Redis and then compare with answer of user,
    // count if >0 => user answers correct
    const questionsCache = this.getQuizFromCache(data.quizId);
    const matchedAnswer = questionsCache.then(a => {
      if (!a.questions) return 0;
      console.log('getQuizFromCache', a.questions);
      // eslint-disable-next-line prettier/prettier
      return a.questions.filter(i => i.id === data.questionId && i.correctAnswer == data.userAnswer).length;
    });
    matchedAnswer.then(async point => {
      console.log('point got: ', point);
      // Publish point to MQ for ParticitationService consume
      this.rabbitClient.emit('answer_point', {
        userId: data.userId,
        questionId: data.questionId,
        quizId: data.quizId,
        point: point,
      });
      // Update point to user's answer
      const existingScore = this.answerRepository.findOneBy({
        userId: data.userId,
        questionId: data.questionId,
        quizId: data.quizId,
      });
      existingScore.then(e => {
        if (!e) {
          throw new Error('point not found');
        }
        e.point = point;
        e.processed = true;
        return this.answerRepository.save(e);
      });
    });
  }

  private async cacheQuiz(quizId: string, questions: any): Promise<void> {
    const cacheKey = `quiz:${quizId}:questions`;
    await this.redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 3600);
  }

  async getQuizFromCache(quizId: string): Promise<any | null> {
    const cacheKey = `quiz:${quizId}:questions`;
    const cachedQuestions = await this.redisClient.get(cacheKey);
    console.log(cachedQuestions);
    return cachedQuestions ? JSON.parse(cachedQuestions) : null;
  }

  // Listen to incoming messages to get answers for validation
  // @MessagePattern('answer_quiz_*')
  // handleQuizAnswer(data: any, metadata: any) {
  //   // Get the message pattern from metadata (it contains the actual pattern used)
  //   // const pattern = metadata.pattern;

  //   // // Apply regex to check if the message matches the full pattern
  //   // const regex = /^answer_quiz_[a-f0-9-]{36}_[a-f0-9-]{36}$/;

  //   // if (regex.test(pattern)) {
  //   // If the pattern matches, handle the data
  //   console.log('Received valid quiz answer:', data);
  //   // Further processing...
  //   // } else {
  //   //   console.log('Invalid message pattern received:', pattern);
  //   // }
  // }
}

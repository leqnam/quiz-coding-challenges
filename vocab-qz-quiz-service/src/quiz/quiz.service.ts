import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { MessagingService } from '@messaging/messaging.service';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionDto } from '@question/models/dto/question.dto';
import { QuizQueryDto } from '@quiz/models/dto/quizQueryDto';
import { QuizSearchDto } from '@quiz/models/dto/quizSearch.dto';
import { environment } from '@utils/constants';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import { UtilsService } from '@utils/services/utils.service';
import Redis from 'ioredis';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { QuizDto } from './models/dto/quiz.dto';
import { Quiz, QuizStatus } from './models/entities/quiz.entity';

@Injectable()
export class QuizService extends SearchService<Quiz, QuizSearchDto> {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
    private rabbitClient: MessagingService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {
    super(quizRepository);
  }

  protected queryBuilder(model: QuizSearchDto): FindOptionsWhere<Quiz> {
    const queryable = {} as FindOptionsWhere<Quiz>;
    if (model.q) {
      if (model.exact) {
        queryable.name = model.q;
      } else {
        queryable.name = Like(`%${model.q}%`);
      }
    }
    return queryable;
  }

  public async query(model: QuizSearchDto) {
    const res = await this.paginate(model);
    return new SearchResultDto<QuizQueryDto>(
      res.pageMeta,
      this.mapper.mapArray(res.data, Quiz, QuizQueryDto),
    );
  }

  public async createQuiz(token: string, dto: QuizDto): Promise<QuizDto> {
    if (await this.getQuiz({ name: dto.name }))
      throw new ConflictException('Quiz is existed');
    try {
      delete dto.id;
      delete dto.createDate;
      delete dto.dateLastMaint;
      dto.addedBy = this.jwtService.decode(token).id;
      if (!dto.hostId) {
        dto.hostId = this.jwtService.decode(token).id;
      }
      const quizTmp = UtilsService.cleanNullObject(dto);
      const quiz = this.quizRepository.create(quizTmp);
      const r = await this.quizRepository.save(quiz);
      return r as QuizDto;
    } catch (error) {
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
  }

  async startQuiz(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) {
      throw new ForbiddenException('Quiz not found');
    }
    if (quiz.status !== QuizStatus.PENDING) {
      throw new ForbiddenException('Quiz has already started or ended');
    }
    quiz.status = QuizStatus.ACTIVE;
    return await this.updateStatusAndPub(quiz);
  }

  async endQuiz(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) {
      throw new ForbiddenException('Quiz not found');
    }
    if (quiz.status !== QuizStatus.ACTIVE) {
      throw new ForbiddenException('Quiz is not currently active');
    }
    quiz.status = QuizStatus.ENDED;
    return await this.updateStatusAndPub(quiz);
  }

  async activeQuiz(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) {
      throw new ForbiddenException('Quiz not found');
    }
    if (quiz.status !== QuizStatus.ENDED) {
      throw new ForbiddenException('Quiz has already started or ended');
    }
    quiz.status = QuizStatus.PENDING;
    return await this.updateStatusAndPub(quiz);
  }

  private async updateStatusAndPub(quiz: Quiz) {
    const rs = await this.quizRepository.save(quiz);
    // await this.rabbitClient.overwriteQueue(
    //   `session_quiz_${quiz.id}`,
    //   quiz.status,
    // );
    return rs;
  }

  public async findById(id: string): Promise<Quiz> {
    const dto = {
      id: id,
    } as Quiz;
    const rs = await this.getQuiz(dto);
    
    return rs;
  }

  private async cacheQuiz(quizId: string, questions: any): Promise<void> {
    const cacheKey = `quiz:${quizId}:questions`;
    await this.redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 3600);
  }

  async getQuizFromCache(quizId: string): Promise<any | null> {
    const cacheKey = `quiz:${quizId}:questions`;
    const cachedQuestions = await this.redisClient.get(cacheKey);
    return cachedQuestions ? JSON.parse(cachedQuestions) : null;
  }

  // Private: Get quiz
  private async getQuiz(quizDto: QuizDto): Promise<Quiz | any> {
    const quiz = this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'question');
    if (quizDto?.name) {
      quiz.where('quiz.name = :name', {
        name: quizDto?.name,
      });
    } else if (quizDto?.id) {
      quiz.where('quiz.id = :quizId', { quizId: quizDto?.id });
    }
    const q = await quiz.getOne();
    if (!q) return null;
    const qid = q.id;
    const questionDtos = q.questions.map(question =>
      UtilsService.cleanNullObject(new QuestionDto(question)),
    );
    const qz = {
      id: qid,
      name: q.name,
      status: q.status,
      questions: questionDtos,
    };

    // Send to Cache and remove correct answer
    await this.cacheQuiz(qid, qz);
    qz.questions.forEach(item => {
      delete item.correctAnswer; // Remove the "age" property
    });
    // const decoded = this.jwtService.decode(tokenService.getToken());
    // const routingKey = `quiz_${decoded.id}_${quizDto.id}`;
    // if (q.status != 'ended') {
    //   await this.rabbitClient.overwriteQueue(routingKey, qz);
    // }
    return qz;
  }
}

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { environment } from '@utils/constants';
import { SearchResultDto } from '@utils/models/dtos/search-result.dto';
import { SearchService } from '@utils/services/search.service';
import { UtilsService } from '@utils/services/utils.service';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { QuestionDto } from './models/dto/question.dto';
import { QuestionQueryDto } from './models/dto/questionQueryDto';
import { QuestionSearchDto } from './models/dto/questionSearch.dto';
import { Question } from './models/entities/question.entity';
import { MessagingService } from '@messaging/messaging.service';

@Injectable()
export class QuestionService extends SearchService<
  Question,
  QuestionSearchDto
> {
  constructor(
    @InjectRepository(Question) private questionsitory: Repository<Question>,
    private jwtService: JwtService,
    @InjectMapper() private mapper: Mapper,
    private rabbitClient: MessagingService,
  ) {
    super(questionsitory);
  }

  protected queryBuilder(model: QuestionSearchDto): FindOptionsWhere<Question> {
    const queryable = {} as FindOptionsWhere<Question>;
    if (model.q) {
      if (model.exact) {
        queryable.content = model.q;
      } else {
        queryable.content = Like(`%${model.q}%`);
      }
    }
    return queryable;
  }

  public async query(model: QuestionSearchDto) {
    const res = await this.paginate(model);
    return new SearchResultDto<QuestionQueryDto>(
      res.pageMeta,
      this.mapper.mapArray(res.data, Question, QuestionQueryDto),
    );
  }

  public async updateQuestion(dto: QuestionDto): Promise<QuestionDto> {
    try {
      const quizTmp = UtilsService.cleanNullObject(dto);
      const quiz = this.questionsitory.create(quizTmp);
      const r = await this.questionsitory.save(quiz);
      return r as QuestionDto;
    } catch (error) {
      throw new BadRequestException(
        `An internal error has occurred. ${
          environment.env != 'production' && error.toString()
        }`,
      );
    }
  }

  public async createQuestion(dto: QuestionDto): Promise<QuestionDto> {
    delete dto.id;
    delete dto.createDate;
    delete dto.dateLastMaint;
    if (await this.getQuestion({ content: dto.content }))
      throw new ConflictException('Question is existed');
    return this.updateQuestion(dto);
  }

  public async findById(id: string): Promise<Question> {
    const dto = {
      id: id,
    } as Question;
    const rs = await this.getQuestion(dto);
    await this.rabbitClient.emit(null, rs);
    return rs;
  }

  // Private: Get Question by id, quizId, content
  private async getQuestion(questionDto: QuestionDto): Promise<Question | any> {
    const question = this.questionsitory.createQueryBuilder('question');
    question
      .select('question.id', 'id')
      .addSelect('question.quizId', 'quizId')
      .addSelect('question.content', 'content')
      .addSelect('question.choices', 'choices');
    if (questionDto?.content) {
      question.where('question.content = :content', {
        content: questionDto?.content,
      });
    } else if (questionDto?.id) {
      question.where('question.id = :uid', { uid: questionDto?.id });
    } else if (questionDto?.quizId) {
      question.where('question.quizId = :quizId', {
        quizId: questionDto?.quizId,
      });
    }
    return await question.getRawOne();
  }
}

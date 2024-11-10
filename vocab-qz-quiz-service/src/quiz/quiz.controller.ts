import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  Version,
} from '@nestjs/common';
import { QuizSearchDto } from '@quiz/models/dto/quizSearch.dto';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { QuizDto } from './models/dto/quiz.dto';
import { QuizService } from './quiz.service';
import { UtilsService } from '@utils/services/utils.service';

@Controller('')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @Version('1')
  async get(@Query(new QueryTransformPipe()) searchModel: QuizSearchDto) {
    const result = await this.quizService.query(searchModel);
    return result;
  }

  @Get('/:id')
  @Version('1')
  async findById(@Param('id') id: string): Promise<QuizDto> {
    const quiz = await this.quizService.findById(id);
    return new QuizDto(UtilsService.cleanNullObject(quiz));
  }

  @Post()
  @Version('1')
  async createQuiz(@Request() req, @Body() body: QuizDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const quiz = await this.quizService.createQuiz(token, body);
    return new QuizDto(UtilsService.cleanNullObject(quiz));
  }

  @Get(':id/start')
  @Version('1')
  async startQuiz(@Param('id') quizId: string) {
    return new QuizDto(
      UtilsService.cleanNullObject(await this.quizService.startQuiz(quizId)),
    );
  }

  @Get(':id/end')
  @Version('1')
  async endQuiz(@Param('id') quizId: string) {
    return new QuizDto(
      UtilsService.cleanNullObject(await this.quizService.endQuiz(quizId)),
    );
  }

  @Get(':id/active')
  @Version('1')
  async activeQuiz(@Param('id') quizId: string) {
    return new QuizDto(
      UtilsService.cleanNullObject(await this.quizService.activeQuiz(quizId)),
    );
  }
}

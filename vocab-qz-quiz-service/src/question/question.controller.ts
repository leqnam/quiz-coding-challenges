import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Version,
} from '@nestjs/common';
import { QuestionSearchDto } from '@question/models/dto/questionSearch.dto';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { QuestionDto } from './models/dto/question.dto';
import { QuestionService } from './question.service';
import { UtilsService } from '@utils/services/utils.service';

@Controller('/question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @Version('1')
  async get(@Query(new QueryTransformPipe()) searchModel: QuestionSearchDto) {
    const result = await this.questionService.query(searchModel);
    return result;
  }

  @Get('/:id')
  @Version('1')
  async findById(@Param('id') id: string): Promise<QuestionDto> {
    return new QuestionDto(
      UtilsService.cleanNullObject(await this.questionService.findById(id)),
    );
  }

  @Post()
  @Version('1')
  async createQuestion(@Request() req, @Body() body: QuestionDto) {
    const quiz = await this.questionService.createQuestion(body);
    return new QuestionDto(UtilsService.cleanNullObject(quiz));
  }

  @Put()
  @Version('1')
  async updateQuestion(@Request() req, @Body() body: QuestionDto) {
    const quiz = await this.questionService.updateQuestion(body);
    return new QuestionDto(UtilsService.cleanNullObject(quiz));
  }
}

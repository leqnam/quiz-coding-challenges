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
import { AnswerSearchDto } from '@answer/models/dto/answerSearch.dto';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { AnswerDto } from '@answer/models/dto/answer.dto';
import { AnswerService } from '@answer/answer.service';
import { UtilsService } from '@utils/services/utils.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @Version('1')
  async get(@Query(new QueryTransformPipe()) searchModel: AnswerSearchDto) {
    const result = await this.answerService.query(searchModel);
    return result;
  }

  @Get('/question/:id')
  @Version('1')
  async findAswerByQuestionId(@Param('id') id: string): Promise<AnswerDto> {
    return new AnswerDto(
      UtilsService.cleanNullObject(
        await this.answerService.getAnswer({ questionId: id }),
      ),
    );
  }

  @Post()
  @Version('1')
  async createAnswer(@Request() req, @Body() body: AnswerDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const a = await this.answerService.createAnswer(token, body);
    return new AnswerDto(UtilsService.cleanNullObject(a));
  }

  // @MessagePattern('answer_queue')
  // async processMessage(@Payload() data: any, @Ctx() context: RmqContext) {
  //   console.log('Mensagem recebida:', data);
  // }
}

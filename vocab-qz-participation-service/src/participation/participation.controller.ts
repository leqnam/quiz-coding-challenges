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
import { ParticipationSearchDto } from '@participation/models/dto/userquizSearch.dto';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { ParticipationDto } from './models/dto/userquiz.dto';
import { ParticipationService } from './participation.service';
import { UtilsService } from '@utils/services/utils.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { environment } from '@utils/constants';

@Controller('/participation')
export class ParticipationController {
  constructor(
    private readonly participationService: ParticipationService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @Version('1')
  async get(
    @Query(new QueryTransformPipe()) searchModel: ParticipationSearchDto,
  ) {
    const result = await this.participationService.query(searchModel);
    return result;
  }

  @Get('/:id')
  @Version('1')
  async findById(@Param('id') id: string): Promise<ParticipationDto> {
    return new ParticipationDto(
      await this.participationService.getParticipation({ id: id }),
    );
  }

  @Get('/user/:userId/quiz/:quizId')
  @Version('1')
  async findUserQuizId(
    @Param('userId') userId: string,
    @Param('quizId') quizId: string,
  ): Promise<ParticipationDto> {
    return new ParticipationDto(
      UtilsService.cleanNullObject(
        await this.participationService.getParticipation({
          userId: userId,
          quizId: quizId,
        }),
      ),
    );
  }

  @Post()
  @Version('1')
  async joinQuiz(@Request() req, @Body() body: ParticipationDto) {
    const token = req.headers.authorization?.split(' ')[1];
    const p = await this.participationService.joinQuiz(token, body);
    return new ParticipationDto(UtilsService.cleanNullObject(p));
  }

  @MessagePattern(environment.rabbitmqName)
  async processMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    if (data) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      try {
        channel.ack(originalMessage);
        await await this.participationService.updateScore(data);
      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(originalMessage); // Uncomment to reject and requeue the message
      }
    }
  }
}

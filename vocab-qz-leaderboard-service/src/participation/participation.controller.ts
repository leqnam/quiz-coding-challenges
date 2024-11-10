import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Controller,
  Get,
  Param,
  Query,
  Version
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ParticipationSearchDto } from '@participation/models/dto/userquizSearch.dto';
import { environment } from '@utils/constants';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';
import { UtilsService } from '@utils/services/utils.service';
import { ParticipationDto } from './models/dto/userquiz.dto';
import { ParticipationService } from './participation.service';

@Controller('/board')
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

  @Get('/quiz/:quizId')
  @Version('1')
  async findById(@Param('quizId') quizId: string): Promise<ParticipationDto> {
    return new ParticipationDto(
      UtilsService.cleanNullObject(
        await this.participationService.getParticipation({ quizId: quizId }),
      ),
    );
  }

  @MessagePattern(environment.rabbitmqName)
  async processMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    if (data) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      try {
        channel.ack(originalMessage);
        console.log(data);
      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(originalMessage); // Uncomment to reject and requeue the message
      }
    }
  }
}

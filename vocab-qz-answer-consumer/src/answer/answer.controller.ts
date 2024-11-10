import { AnswerService } from '@answer/answer.service';
import { AnswerSearchDto } from '@answer/models/dto/answerSearch.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get, Query, Version } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { QueryTransformPipe } from '@utils/pipes/query-transform.pipe';

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

  // @EventPattern('answer_quiz_*')
  // async handleIt(data: Record<string, unknown>) {
  //   console.log('EventPattern', data);
  // }

  @MessagePattern('answer_queue')
  async processMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    if (data) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      try {
        channel.ack(originalMessage);
        await this.answerService.validateAnswer(data);
      } catch (error) {
        console.error('Error processing message:', error);
        channel.nack(originalMessage); // Uncomment to reject and requeue the message
      }
    }
  }
}

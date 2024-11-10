import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Answer } from '@answer/models/entities/answer.entity';
import { AnswerQueryDto } from '@answer/models/dto/answerQueryDto';

export class AnswerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Answer, AnswerQueryDto);
    };
  }
}

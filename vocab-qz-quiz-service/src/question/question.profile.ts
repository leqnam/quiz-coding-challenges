import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Question } from '@question/models/entities/question.entity';
import { QuestionQueryDto } from '@question/models/dto/questionQueryDto';

export class QuestionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Question, QuestionQueryDto);
    };
  }
}

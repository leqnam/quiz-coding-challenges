import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Quiz } from '@quiz/models/entities/quiz.entity';
import { QuizQueryDto } from '@quiz/models/dto/quizQueryDto';

export class QuizProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Quiz, QuizQueryDto);
    };
  }
}

import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Participation } from '@participation/models/entities/userquiz.entity';
import { ParticipationQueryDto } from '@participation/models/dto/userquizQueryDto';

export class ParticipationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return mapper => {
      createMap(mapper, Participation, ParticipationQueryDto);
    };
  }
}

import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@utils/models/dtos/abstract.dto';

export class ParticipationQueryDto extends AbstractDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  userId?: string;

  @AutoMap()
  quizId?: string;

  @AutoMap()
  score?: number;

  @AutoMap()
  quizName?: string;

  @AutoMap()
  userName?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isActive?: boolean;

  @AutoMap()
  note?: string;

  @AutoMap()
  addedBy?: string;

  @AutoMap()
  editedBy?: string;
}

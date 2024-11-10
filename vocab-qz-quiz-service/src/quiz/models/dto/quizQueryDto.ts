import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@utils/models/dtos/abstract.dto';

export class QuizQueryDto extends AbstractDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  name?: string;

  @AutoMap()
  code?: string;

  @AutoMap()
  hostId?: string;

  @AutoMap()
  addedBy?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isActive?: boolean;

  @AutoMap()
  note?: string;
}

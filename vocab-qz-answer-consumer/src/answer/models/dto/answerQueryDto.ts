import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@utils/models/dtos/abstract.dto';

export class AnswerQueryDto extends AbstractDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  userId?: string;

  @AutoMap()
  quizId?: string;

  @AutoMap()
  questionId?: string;

  @AutoMap()
  userAnswer?: string;

  @AutoMap()
  point?: number;

  @AutoMap()
  processed?: boolean;
}

import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Answer } from '../entities/answer.entity';

export class AnswerDto extends AbstractDto {
  id?: string;

  userId?: string;

  quizId?: string;

  questionId?: string;

  userAnswer?: string;

  point?: number;

  processed?: boolean;

  constructor(_: Answer | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.userId = _.userId;
      this.quizId = _.quizId;
      this.questionId = _.mobile;
      this.userAnswer = _.userAnswer;
      this.point = _.point;
      this.processed = _.processed;
    }
  }
}

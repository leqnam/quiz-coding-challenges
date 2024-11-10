import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '@question/models/entities/question.entity';

export class QuizDto extends AbstractDto {
  id?: string;

  name?: string;

  code?: string;

  hostId?: string;

  status?: string;

  isActive?: boolean;

  note?: string;

  addedBy?: string;

  questions?: Question[];

  constructor(_: Quiz | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.name = _.name;
      this.code = _.code;
      this.hostId = _.hostId;
      this.addedBy = _.addedBy;
      this.status = _.status;
      this.isActive = _.isActive;
      this.note = _.note;
      this.questions = _.questions;
    }
  }
}

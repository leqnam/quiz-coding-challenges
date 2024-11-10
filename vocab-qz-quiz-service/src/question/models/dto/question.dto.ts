import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Question } from '../entities/question.entity';

export class QuestionDto extends AbstractDto {
  id?: string;

  quizId?: string;

  content?: string;

  answerType?: string;

  choices?: string;

  correctAnswer?: string;

  explanation?: string;

  isActive?: boolean;

  note?: string;

  constructor(_: Question | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.quizId = _.quizId;
      this.content = _.content;
      this.correctAnswer = _.correctAnswer;
      this.choices = _.choices;
      this.isActive = _.isActive;
      this.note = _.note;
    }
  }
}

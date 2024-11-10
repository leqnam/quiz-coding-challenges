import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Question } from '../entities/question.entity';

export class QuestionQueryDto extends AbstractDto {
  id?: string;

  content?: string;

  answerType?: string;

  choices?: string;

  constructor(_: Question | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.content = _.content;
      this.choices = _.choices;
    }
  }
}

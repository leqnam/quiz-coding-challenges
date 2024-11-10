import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { Question } from '@question/models/entities/question.entity';

export class QuestionSearchDto extends AbstractSearchDto<Question> {}

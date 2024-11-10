import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { Quiz } from '@quiz/models/entities/quiz.entity';

export class QuizSearchDto extends AbstractSearchDto<Quiz> {}
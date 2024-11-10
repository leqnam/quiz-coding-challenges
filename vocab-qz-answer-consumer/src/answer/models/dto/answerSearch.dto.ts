import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { Answer } from '@answer/models/entities/answer.entity';

export class AnswerSearchDto extends AbstractSearchDto<Answer> {}

import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Question } from '../entities/question.entity';
export declare class QuestionQueryDto extends AbstractDto {
    id?: string;
    content?: string;
    answerType?: string;
    choices?: string;
    constructor(_: Question | any);
}

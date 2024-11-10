import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Question } from '../entities/question.entity';
export declare class QuestionDto extends AbstractDto {
    id?: string;
    quizId?: string;
    content?: string;
    answerType?: string;
    choices?: string;
    correctAnswer?: string;
    explanation?: string;
    isActive?: boolean;
    note?: string;
    constructor(_: Question | any);
}

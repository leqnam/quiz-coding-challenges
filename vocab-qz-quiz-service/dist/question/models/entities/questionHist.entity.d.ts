import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { QuestionDto } from '../dto/question.dto';
export declare class QuestionHist extends AbstractEntity<QuestionDto> {
    dtoClass: typeof QuestionDto;
    histId: string;
    id?: string;
    quizId?: string;
    content?: string;
    answerType?: string;
    choices?: string;
    correctAnswer?: string;
    explanation?: string;
    isActive?: boolean;
    note?: string;
}

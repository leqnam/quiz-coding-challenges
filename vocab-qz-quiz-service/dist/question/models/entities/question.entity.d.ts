import { Quiz } from '@quiz/models/entities/quiz.entity';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { QuestionDto } from '../dto/question.dto';
export declare class Question extends AbstractEntity<QuestionDto> {
    dtoClass: typeof QuestionDto;
    id?: string;
    quizId?: string;
    content?: string;
    answerType?: string;
    choices?: string;
    correctAnswer?: string;
    explanation?: string;
    isActive?: boolean;
    note?: string;
    quiz: Quiz;
}

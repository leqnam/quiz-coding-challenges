import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { QuizDto } from '../dto/quiz.dto';
import { Question } from '@question/models/entities/question.entity';
export declare enum QuizStatus {
    PENDING = "pending",
    ACTIVE = "active",
    ENDED = "ended"
}
export declare class Quiz extends AbstractEntity<QuizDto> {
    dtoClass: typeof QuizDto;
    id?: string;
    name?: string;
    code?: string;
    hostId?: string;
    status?: string;
    isActive?: boolean;
    note?: string;
    questions: Question[];
}

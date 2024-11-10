import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '@question/models/entities/question.entity';
export declare class QuizDto extends AbstractDto {
    id?: string;
    name?: string;
    code?: string;
    hostId?: string;
    status?: string;
    isActive?: boolean;
    note?: string;
    addedBy?: string;
    questions?: Question[];
    constructor(_: Quiz | any);
}

import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { QuizDto } from '../dto/quiz.dto';
export declare class QuizHist extends AbstractEntity<QuizDto> {
    dtoClass: typeof QuizDto;
    histId: string;
    id?: string;
    name?: string;
    code?: string;
    hostId?: string;
    status?: string;
    isActive?: boolean;
    note?: string;
}

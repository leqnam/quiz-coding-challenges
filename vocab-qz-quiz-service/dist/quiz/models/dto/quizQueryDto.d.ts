import { AbstractDto } from '@utils/models/dtos/abstract.dto';
export declare class QuizQueryDto extends AbstractDto {
    id?: string;
    name?: string;
    code?: string;
    hostId?: string;
    addedBy?: string;
    status?: string;
    isActive?: boolean;
    note?: string;
}

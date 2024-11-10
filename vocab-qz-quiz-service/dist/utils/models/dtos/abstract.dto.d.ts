import { AbstractEntity } from '../entities/abstract.entity';
export declare class AbstractDto {
    createDate?: Date;
    effectDate?: Date;
    inactiveDate?: Date;
    dateLastMaint?: Date;
    version?: number;
    deletedBy?: string;
    constructor(abstract?: AbstractEntity);
}

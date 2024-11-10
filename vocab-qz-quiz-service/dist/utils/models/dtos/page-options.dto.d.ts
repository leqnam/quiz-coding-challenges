import { Sort } from '@utils/enum.constant';
export declare class PageOptionsDto {
    readonly order?: Sort;
    readonly page?: number;
    readonly take?: number;
    get skip(): number;
}

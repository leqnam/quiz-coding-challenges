export declare class UtilsService {
    static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E, options?: any): T;
    static toDto<T, E>(model: new (entity: E, options?: any) => T, entity: E[], options?: any): T[];
    static generateHash(password: string): string;
    static validateHash(password: string, hash: string): Promise<boolean>;
    static generateRandomInteger(min: number, max: number): number;
    static generateRandomString(length: number): string;
    static getAge(d1: Date, d2?: Date): number;
    static capitalizeName(name: string): string;
    static encodeString(text: string): string;
    static mergeObject: (A: any, B: any) => any;
    static cleanNullObject<T>(obj: T): T;
}

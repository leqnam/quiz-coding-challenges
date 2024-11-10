import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as crypto from 'crypto';

export class UtilsService {
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: any,
  ): T;
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: any,
  ): T[];
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[] | any,
    options?: any,
  ): T | T[] {
    if (_.isArray(entity)) {
      return entity.map((u: E) => new model(u, options));
    }

    return new model(entity, options);
  }

  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  static async validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  static generateRandomInteger(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  static generateRandomString(length: number): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toUpperCase()
      .substr(0, length);
  }

  static getAge(d1: Date, d2?: Date): number {
    d2 = d2 || new Date();
    const diff = d2.getTime() - d1.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  static capitalizeName(name: string): string {
    return _.capitalize(name);
  }

  /**
   * encode (hash) text to sha256
   * @param {string} text
   * @returns {string}
   */
  static encodeString(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }

  static mergeObject = (A, B) => {
    return Object.keys(B).reduce(
      (result, key) => {
        if (B[key] !== undefined) {
          result[key] = B[key];
        }
        return result;
      },
      { ...A },
    );
    // const res = {};
    // Object.keys({ ...A, ...B }).map(key => {
    //   res[key] = B[key] || A[key];
    // });
    // return res;
    // B = Object.keys(B).forEach(key => {
    //   if (B[key] === undefined) {
    //     delete B[key];
    //   }
    // });
    // return Object.assign(A, B);
  };

  static cleanNullObject<T>(obj: T): T {
    // return Object.keys(obj).forEach(k => obj[k] == null && delete obj[k]);
    Object.keys(obj).forEach(key => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  }
}

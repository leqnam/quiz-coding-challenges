import { REGEX_DATE_YYYY_MM_DD } from './constants';

// export const getClient = <T>(ctx: ExecutionContext): T => {
//   switch (ctx.getType()) {
//     case 'ws':
//       return ctx.switchToWs().getClient().handshake;
//     case 'http':
//       return ctx.switchToHttp().getRequest();
//     default:
//       return undefined;
//   }
// };

export function transformEndOfDate(date: Date | string): Date {
  if (!date || date === 'null') return null;
  const newDate = new Date(date);
  // Set the hours and minutes to the last hour of the day
  newDate.setHours(23);
  newDate.setMinutes(59);
  newDate.setSeconds(59);
  newDate.setMilliseconds(0);
  return newDate;
}

export const randomString = (length = 60) => {
  let output = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    output += characters[Math.floor(Math.random() * length)];
  }
  return output;
};

/**
 * Check a value is date or not. Following by YYYY-MM-DD
 * @param string
 * @returns true/false
 */
export function isDate(value: any) {
  let isDate = value instanceof Date;

  if (!isDate && typeof value === 'string' && value.length) {
    const regex = new RegExp(REGEX_DATE_YYYY_MM_DD);
    if (regex.test(value))
      isDate = new Date(value).toDateString() !== 'undefined';
  }
  return isDate;
}

const toDate = new Date();

export function getTodayFormatYYYYDDMM() {
  return `${toDate.getFullYear()}-${
    toDate.getMonth() < 10 ? '0' + toDate.getMonth() : toDate.getMonth()
  }-${toDate.getDate() < 10 ? '0' + toDate.getDate() : toDate.getDate()}`;
}

/**
 * Check if any item in array1 exist in array2
 * @param arr1 array1
 * @param arr2 array2
 * @returns boolean
 */

export function hasCommonItemInArrays(arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
}

export function convertToAscii(str) {
  const asciiArray = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let asciiValue = char.charCodeAt(0);
    if (asciiValue === 160) {
      asciiValue = 32;
    }
    asciiArray.push(asciiValue);
  }
  return asciiArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
}

/**
 * Construct URLs with multiple dynamic segments often
 * @param base Base URL
 * @param path Path with params
 * @param params Object entries
 * @returns Full URL
 * Example: constructUrl(environment.quiz, '/v1/:quizId', { quizId })
 */
export function constructUrl(
  base: string,
  path: string,
  params: Record<string, string>,
): string {
  let url = `${base}${path}`;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value);
  }
  return url;
}

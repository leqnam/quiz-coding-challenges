import { REGEX_DATE_YYYY_MM_DD } from './constants';

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
 * Clean the given Object if there are some properties are null/undefine
 * @param {string} Object
 * @returns {boolean} Object
 */
export const cleanNullObject = <T>(obj: T): T => {
  // return Object.keys(obj).forEach(k => obj[k] == null && delete obj[k]);
  Object.keys(obj).forEach(key => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

/**
 * Check if the given value is null/undefine
 * @param {string} value
 * @returns {boolean} true/false
 */
export const isNullable = (value: any): boolean => {
  return value == null || value == undefined;
};

/**
 * Check if the given date is future date with the current date
 * @param {string} Date
 * @returns {boolean} true/false
 */
export function isFutureDate(value: any) {
  // const isFuture = transformEndOfDate(new Date(value)) >= new Date();
  const isFuture = new Date(value) >= new Date();
  return isFuture;
}

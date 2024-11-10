"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
exports.transformEndOfDate = transformEndOfDate;
exports.isDate = isDate;
exports.getTodayFormatYYYYDDMM = getTodayFormatYYYYDDMM;
exports.hasCommonItemInArrays = hasCommonItemInArrays;
exports.convertToAscii = convertToAscii;
const constants_1 = require("./constants");
function transformEndOfDate(date) {
    if (!date || date === 'null')
        return null;
    const newDate = new Date(date);
    newDate.setHours(23);
    newDate.setMinutes(59);
    newDate.setSeconds(59);
    newDate.setMilliseconds(0);
    return newDate;
}
const randomString = (length = 60) => {
    let output = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        output += characters[Math.floor(Math.random() * length)];
    }
    return output;
};
exports.randomString = randomString;
function isDate(value) {
    let isDate = value instanceof Date;
    if (!isDate && typeof value === 'string' && value.length) {
        const regex = new RegExp(constants_1.REGEX_DATE_YYYY_MM_DD);
        if (regex.test(value))
            isDate = new Date(value).toDateString() !== 'undefined';
    }
    return isDate;
}
const toDate = new Date();
function getTodayFormatYYYYDDMM() {
    return `${toDate.getFullYear()}-${toDate.getMonth() < 10 ? '0' + toDate.getMonth() : toDate.getMonth()}-${toDate.getDate() < 10 ? '0' + toDate.getDate() : toDate.getDate()}`;
}
function hasCommonItemInArrays(arr1, arr2) {
    return arr1.some(item => arr2.includes(item));
}
function convertToAscii(str) {
    const asciiArray = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        let asciiValue = char.charCodeAt(0);
        if (asciiValue === 160) {
            asciiValue = 32;
        }
        asciiArray.push(asciiValue);
    }
    return asciiArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
//# sourceMappingURL=helper.js.map
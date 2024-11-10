"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const bcrypt = require("bcrypt");
const _ = require("lodash");
const crypto = require("crypto");
class UtilsService {
    static toDto(model, entity, options) {
        if (_.isArray(entity)) {
            return entity.map((u) => new model(u, options));
        }
        return new model(entity, options);
    }
    static generateHash(password) {
        return bcrypt.hashSync(password, 10);
    }
    static async validateHash(password, hash) {
        return bcrypt.compare(password, hash || '');
    }
    static generateRandomInteger(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    static generateRandomString(length) {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .toUpperCase()
            .substr(0, length);
    }
    static getAge(d1, d2) {
        d2 = d2 || new Date();
        const diff = d2.getTime() - d1.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
    static capitalizeName(name) {
        return _.capitalize(name);
    }
    static encodeString(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }
    static cleanNullObject(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === null) {
                delete obj[key];
            }
        });
        return obj;
    }
}
exports.UtilsService = UtilsService;
UtilsService.mergeObject = (A, B) => {
    return Object.keys(B).reduce((result, key) => {
        if (B[key] !== undefined) {
            result[key] = B[key];
        }
        return result;
    }, { ...A });
};
//# sourceMappingURL=utils.service.js.map
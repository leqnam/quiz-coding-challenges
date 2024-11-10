"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const remove = (arr, predicate) => {
    const results = arr.filter(predicate);
    for (const result of results) {
        arr.splice(arr.indexOf(result), 1);
    }
    return results;
};
exports.remove = remove;
//# sourceMappingURL=remove.js.map
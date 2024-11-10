"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKey = extractKey;
const fs_1 = require("fs");
function extractKey(path) {
    return (0, fs_1.readFileSync)(path)
        .toString()
        .replace(/\n|\r/g, '')
        .replace(/[-]+[\w\s]+[-]+/g, '');
}
//# sourceMappingURL=keys.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIRTUAL_COLUMN_KEY = void 0;
exports.VirtualColumn = VirtualColumn;
require("reflect-metadata");
exports.VIRTUAL_COLUMN_KEY = Symbol('VIRTUAL_COLUMN_KEY');
function VirtualColumn(name) {
    return (target, propertyKey) => {
        const metaInfo = Reflect.getMetadata(exports.VIRTUAL_COLUMN_KEY, target) || {};
        metaInfo[propertyKey] = name ?? propertyKey;
        Reflect.defineMetadata(exports.VIRTUAL_COLUMN_KEY, metaInfo, target);
    };
}
//# sourceMappingURL=virtualcolumn.decorator.js.map
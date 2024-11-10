"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryEntitySubscriber = void 0;
const entity_history_decorator_1 = require("../decorators/entity-history.decorator");
const typeorm_1 = require("typeorm");
let HistoryEntitySubscriber = class HistoryEntitySubscriber {
    async afterInsert(event) {
        const historyEntity = Reflect.getMetadata(entity_history_decorator_1.hisEntityMetadataKey, event.metadata.target);
        if (historyEntity)
            await event.manager.getRepository(historyEntity).insert(event.entity);
    }
    async afterUpdate(event) {
        const historyEntity = Reflect.getMetadata(entity_history_decorator_1.hisEntityMetadataKey, event.metadata.target);
        if (historyEntity)
            await event.manager.getRepository(historyEntity).insert(event.entity);
    }
    async afterSoftRemove(event) {
        const historyEntity = Reflect.getMetadata(entity_history_decorator_1.hisEntityMetadataKey, event.metadata.target);
        if (historyEntity)
            await event.manager.getRepository(historyEntity).insert(event.entity);
    }
};
exports.HistoryEntitySubscriber = HistoryEntitySubscriber;
exports.HistoryEntitySubscriber = HistoryEntitySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], HistoryEntitySubscriber);
//# sourceMappingURL=history-entity.subscriber.js.map
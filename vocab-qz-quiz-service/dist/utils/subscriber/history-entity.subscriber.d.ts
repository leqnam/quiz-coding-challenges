import { EntitySubscriberInterface, InsertEvent, SoftRemoveEvent, UpdateEvent } from 'typeorm';
export declare class HistoryEntitySubscriber implements EntitySubscriberInterface<any> {
    afterInsert(event: InsertEvent<any>): Promise<void>;
    afterUpdate(event: UpdateEvent<any>): Promise<void>;
    afterSoftRemove(event: SoftRemoveEvent<any>): Promise<void>;
}

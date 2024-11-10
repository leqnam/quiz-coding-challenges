import { hisEntityMetadataKey } from '@utils/decorators/entity-history.decorator';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class HistoryEntitySubscriber implements EntitySubscriberInterface<any> {
  async afterInsert(event: InsertEvent<any>): Promise<void> {
    const historyEntity = Reflect.getMetadata(
      hisEntityMetadataKey,
      event.metadata.target,
    );

    if (historyEntity)
      await event.manager.getRepository(historyEntity).insert(event.entity);
  }

  async afterUpdate(event: UpdateEvent<any>): Promise<void> {
    const historyEntity = Reflect.getMetadata(
      hisEntityMetadataKey,
      event.metadata.target,
    );

    if (historyEntity)
      await event.manager.getRepository(historyEntity).insert(event.entity);
  }

  async afterSoftRemove(event: SoftRemoveEvent<any>): Promise<void> {
    const historyEntity = Reflect.getMetadata(
      hisEntityMetadataKey,
      event.metadata.target,
    );
    if (historyEntity)
      await event.manager.getRepository(historyEntity).insert(event.entity);
  }
}

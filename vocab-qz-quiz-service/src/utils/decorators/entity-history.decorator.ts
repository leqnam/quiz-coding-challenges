export const hisEntityMetadataKey: symbol = Symbol(
  'History Entity Metadata Key',
);
export function HistoryEntity(historyEntity: any): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return <TFunction extends Function>(target: TFunction): void => {
    Reflect.defineMetadata(hisEntityMetadataKey, historyEntity, target);
  };
}

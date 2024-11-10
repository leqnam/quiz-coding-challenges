import 'reflect-metadata';

export const VIRTUAL_COLUMN_KEY = Symbol('VIRTUAL_COLUMN_KEY');

export function VirtualColumn(name?: string): PropertyDecorator {
  return (target, propertyKey) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, target) || {};

    metaInfo[propertyKey] = name ?? propertyKey;

    Reflect.defineMetadata(VIRTUAL_COLUMN_KEY, metaInfo, target);
  };
}
// Usage:
// import { VirtualColumn } from "src/database/decorators/virtual-column.decorator";
// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity({ name: "users" })
// export class UserEntity {
//   @PrimaryGeneratedColumn()
//   public id: number;

//   @Column()
//   public firstName: string;

//   @Column()
//   public lastName: string;

//   @VirtualColumn()
//   public fullName: string;
// }

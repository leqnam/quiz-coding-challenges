import { AbstractEntity } from '../entities/abstract.entity';
import { AutoMap } from '@automapper/classes';

export class AbstractDto {
  @AutoMap()
  createDate?: Date;

  @AutoMap()
  effectDate?: Date;

  @AutoMap()
  inactiveDate?: Date;

  @AutoMap()
  dateLastMaint?: Date;

  @AutoMap()
  version?: number;

  @AutoMap()
  deletedBy?: string;

  constructor(abstract?: AbstractEntity) {
    if (abstract) {
      this.createDate = abstract.createDate;
      this.effectDate = abstract.effectDate;
      this.inactiveDate = abstract.inactiveDate;
      this.dateLastMaint = abstract.dateLastMaint;
      this.version = abstract.version;
      this.deletedBy = abstract.deletedBy;
    }
  }
}

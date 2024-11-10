import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { AutoMap } from '@automapper/classes';
import { Expose } from 'class-transformer';
import { UtilsService } from '@utils/services/utils.service';
import { isDate } from '@utils/helper';

export class UserQueryDto extends AbstractDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  name: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  mobile?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isActive?: boolean;

  @AutoMap()
  addedBy?: string;

  @AutoMap()
  editedBy?: string;

  @AutoMap()
  dob?: Date;

  @Expose()
  get age(): number | undefined {
    if (this.dob && isDate(this.dob)) {
      return UtilsService.getAge(new Date(this.dob), new Date());
    } else {
      return 0;
    }
  }
}

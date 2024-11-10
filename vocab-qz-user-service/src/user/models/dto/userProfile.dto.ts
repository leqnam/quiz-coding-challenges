import { isFutureDate, isNullable } from '@utils/helper';
import { User } from '@user/models/entities/user.entity';
import { UserDto } from '@user/models/dto/user.dto';

export class UserProfileDto extends UserDto {
  isActive?: boolean;

  constructor(_: User | any) {
    super(_);
    if (_) {
      this.isActive =
        !isNullable(_.effectDate) &&
        !isFutureDate(_.effectDate) &&
        (isNullable(_.inactiveDate) ||
          (!isNullable(_.inactiveDate) && isFutureDate(_.inactiveDate)))
          ? true
          : false;
    }
  }
}

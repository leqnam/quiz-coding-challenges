import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  IsDateFormat,
  IsPhoneNumber,
  IsValidDoB,
} from '@utils/valdator/validator-constraint';
import { UtilsService } from '@utils/services/utils.service';
import { isDate } from '@utils/helper';

export class UserDto extends AbstractDto {
  id?: string;

  @IsNotEmpty({ message: 'Name is mandatory' })
  @MinLength(3)
  @MaxLength(30)
  name?: string;

  @IsEmail({}, { message: 'Email has invalid format' })
  @MaxLength(50)
  email?: string;

  password?: string;

  @IsNotEmpty({ message: 'Mobile is mandatory' })
  @IsPhoneNumber({ message: 'Mobile has invalid format' })
  mobile?: string;

  status?: string;

  note?: string;

  sessionToken?: string;

  addedBy?: string;

  editedBy?: string;

  @IsDateFormat({
    message: 'dob has invalid format. Must be YYYY-MM-DD',
  })
  @IsValidDoB({
    message: 'dob must be before current date',
  })
  dob?: Date;

  age?: number;

  constructor(_: User | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.email = _.email;
      this.name = _.name;
      this.password = _.password;
      this.mobile = _.mobile;
      this.status = _.status;
      this.note = _.note;
      this.sessionToken = _.sessionToken;
      this.addedBy = _.addedBy;
      this.editedBy = _.editedBy;
      this.dob = _.dob;
      if (_.dob && isDate(_.dob)) {
        this.age = UtilsService.getAge(new Date(_.dob), new Date());
      } else {
        this.age = 0;
      }
    }
  }
}
export class UserLoginDto extends AbstractDto {
  @IsNotEmpty({ message: 'Password is mandatory' })
  @MinLength(5)
  @MaxLength(30)
  password?: string;

  @IsNotEmpty({ message: 'Mobile is mandatory' })
  @IsPhoneNumber({ message: 'Mobile has invalid format' })
  mobile?: string;

  constructor(_: User | any) {
    super(_);
    if (_) {
      this.password = _.password;
      this.mobile = _.mobile;
    }
  }
}

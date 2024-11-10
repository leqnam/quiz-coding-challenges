import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { User } from '@user/models/entities/user.entity';

export class UserSearchDto extends AbstractSearchDto<User> {}

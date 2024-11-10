import { AbstractDto } from '@utils/models/dtos/abstract.dto';

export class TokenDto extends AbstractDto {
  accessToken?: string;
}

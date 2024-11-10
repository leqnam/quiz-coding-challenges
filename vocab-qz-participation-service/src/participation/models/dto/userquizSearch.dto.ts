import { AbstractSearchDto } from '@utils/models/dtos/abstract-search.dto';
import { Participation } from '@participation/models/entities/userquiz.entity';

export class ParticipationSearchDto extends AbstractSearchDto<Participation> {}

import { AbstractDto } from '@utils/models/dtos/abstract.dto';
import { Participation } from '../entities/userquiz.entity';

export class ParticipationDto extends AbstractDto {
  id?: string;

  userId?: string;

  quizId?: string;

  score?: number;

  quizName?: string;

  userName?: string;

  status?: string;

  isActive?: boolean;

  note?: string;

  addedBy?: string;

  editedBy?: string;

  constructor(_: Participation | any) {
    super(_);
    if (_) {
      this.id = _.id;
      this.quizId = _.quizId;
      this.userId = _.userId;
      this.score = _.score;
      this.userName = _.userName;
      this.quizName = _.quizName;
      this.status = _.status;
      this.isActive = _.isActive;
      this.note = _.note;
      this.addedBy = _.addedBy;
      this.editedBy = _.editedBy;
    }
  }
}

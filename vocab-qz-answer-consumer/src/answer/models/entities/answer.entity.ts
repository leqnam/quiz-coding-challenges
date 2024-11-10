import { AutoMap } from '@automapper/classes';
import { HistoryEntity } from '@utils/decorators/entity-history.decorator';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerDto } from '../dto/answer.dto';
import { AnswerHist } from './answerHist.entity';

@Entity({ name: 'answer' })
@HistoryEntity(AnswerHist)
export class Answer extends AbstractEntity<AnswerDto> {
  dtoClass = AnswerDto;

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @Index()
  @PrimaryColumn({
    comment: '(Foreign Key, UUID): The user who submitted the answer',
  })
  userId?: string;

  @AutoMap()
  @Index()
  @PrimaryColumn({
    comment: '(Foreign Key, UUID): The quiz the answer belongs to',
  })
  quizId?: string;

  @AutoMap()
  @Index()
  @PrimaryColumn({
    comment: '(Foreign Key, UUID): The question being answered',
  })
  questionId?: string;

  @AutoMap()
  @Column({
    comment: 'The answer given by the user',
  })
  userAnswer?: string;

  @AutoMap()
  @Column({
    nullable: true,
    comment: 'Point per answer',
  })
  point?: number;

  @AutoMap()
  @Column({
    nullable: true,
    default: false,
    comment: 'Indicate if the point has proceed',
  })
  processed?: boolean;
}

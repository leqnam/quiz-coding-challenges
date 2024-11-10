import { AutoMap } from '@automapper/classes';
import { HistoryEntity } from '@utils/decorators/entity-history.decorator';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipationHist } from './userquizHist.entity';
import { ParticipationDto } from '../dto/userquiz.dto';

@Entity({ name: 'userquiz' })
@HistoryEntity(ParticipationHist)
export class Participation extends AbstractEntity<ParticipationDto> {
  dtoClass = ParticipationDto;

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @PrimaryColumn({
    comment: '(Foreign Key, UUID): The user who joined the quiz.',
  })
  userId?: string;

  @AutoMap()
  @PrimaryColumn({
    comment: '(Foreign Key, UUID): The quiz the user joined.',
  })
  quizId?: string;

  @AutoMap()
  @Column({ default: 0 })
  score?: number;

  @AutoMap()
  @Column({ nullable: true })
  quizName?: string;

  @AutoMap()
  @Column({ nullable: true })
  userName?: string;

  @AutoMap()
  @Column({ nullable: true })
  status?: string;

  @AutoMap()
  @Column({ default: true })
  isActive?: boolean;

  @AutoMap()
  @Column({ nullable: true })
  note?: string;
}

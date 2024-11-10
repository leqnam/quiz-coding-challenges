import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipationDto } from '../dto/userquiz.dto';

@Entity({ name: 'userquizhist' })
export class ParticipationHist extends AbstractEntity<ParticipationDto> {
  dtoClass = ParticipationDto;

  @PrimaryGeneratedColumn('uuid')
  histId: string;

  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ nullable: true })
  quizId?: string;

  @Column({ nullable: true })
  score?: number;

  @Column({ nullable: true })
  quizName?: string;

  @Column({ nullable: true })
  userName?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  isActive?: boolean;

  @Column({ nullable: true })
  note?: string;
}

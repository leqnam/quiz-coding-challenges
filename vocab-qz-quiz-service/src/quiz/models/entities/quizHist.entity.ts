import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { QuizDto } from '../dto/quiz.dto';

@Entity({ name: 'quizhist' })
export class QuizHist extends AbstractEntity<QuizDto> {
  dtoClass = QuizDto;

  @PrimaryGeneratedColumn('uuid')
  histId: string;

  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  code?: string;

  @Column({
    nullable: true,
    comment: 'Foreign Key, UUID: The userId of the person hosting the quiz.',
  })
  hostId?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ nullable: true })
  note?: string;
}

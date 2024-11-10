import { AutoMap } from '@automapper/classes';
import { HistoryEntity } from '@utils/decorators/entity-history.decorator';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuizDto } from '../dto/quiz.dto';
import { QuizHist } from './quizHist.entity';
import { Question } from '@question/models/entities/question.entity';

export enum QuizStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  ENDED = 'ended',
}

@Entity({ name: 'quiz' })
@HistoryEntity(QuizHist)
export class Quiz extends AbstractEntity<QuizDto> {
  dtoClass = QuizDto;

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @Column({ nullable: true })
  name?: string;

  @AutoMap()
  @Column({ nullable: true })
  code?: string;

  @AutoMap()
  @Column({
    nullable: true,
    comment: 'Foreign Key, UUID: The userId of the person hosting the quiz.',
  })
  hostId?: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: QuizStatus,
    default: QuizStatus.PENDING,
  })
  status?: string;

  @AutoMap()
  @Column({ default: true })
  isActive?: boolean;

  @AutoMap()
  @Column({ nullable: true })
  note?: string;

  @OneToMany(() => Question, question => question.quiz, { cascade: true })
  questions: Question[];
}

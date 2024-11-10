import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerDto } from '../dto/answer.dto';

@Entity({ name: 'answerhist' })
export class AnswerHist extends AbstractEntity<AnswerDto> {
  dtoClass = AnswerDto;

  @PrimaryGeneratedColumn('uuid')
  histId: string;

  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ nullable: true })
  quizId?: string;

  @Column({ nullable: true })
  questionId?: string;

  @Column({ nullable: true })
  userAnswer?: string;

  @Column({ nullable: true })
  point?: number;
}

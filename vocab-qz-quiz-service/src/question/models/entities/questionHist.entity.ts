import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionDto } from '../dto/question.dto';

@Entity({ name: 'questionhist' })
export class QuestionHist extends AbstractEntity<QuestionDto> {
  dtoClass = QuestionDto;

  @PrimaryGeneratedColumn('uuid')
  histId: string;

  @Column({ nullable: true })
  id?: string;

  @Column({
    nullable: true,
    comment: 'Foreign Key, UUID): The quiz_id to which this question belongs.',
  })
  quizId?: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  answerType?: string;

  @Column({ nullable: true })
  choices?: string;

  @Column({ nullable: true })
  correctAnswer?: string;

  @Column({ nullable: true })
  explanation?: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ nullable: true })
  note?: string;
}

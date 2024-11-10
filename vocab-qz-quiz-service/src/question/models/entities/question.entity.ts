import { AutoMap } from '@automapper/classes';
import { Quiz } from '@quiz/models/entities/quiz.entity';
import { HistoryEntity } from '@utils/decorators/entity-history.decorator';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionDto } from '../dto/question.dto';
import { QuestionHist } from './questionHist.entity';

@Entity({ name: 'question' })
@HistoryEntity(QuestionHist)
export class Question extends AbstractEntity<QuestionDto> {
  dtoClass = QuestionDto;

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @PrimaryColumn({
    comment: 'Foreign Key, UUID: The quiz_id to which this question belongs.',
  })
  quizId?: string;

  @AutoMap()
  @Column({ nullable: true })
  content?: string;

  @AutoMap()
  @Column({ nullable: true, comment: 'multiple_choice, text, boolean' })
  answerType?: string;

  @AutoMap()
  @Column({
    nullable: true,
    comment:
      'A list of possible answers (only used if answer_type is multiple_choice)',
  })
  choices?: string;

  @AutoMap()
  @Column({
    nullable: true,
    comment: 'The correct answer to the question.',
  })
  correctAnswer?: string;

  @AutoMap()
  @Column({
    nullable: true,
    comment: 'A detailed explanation of the answer.',
  })
  explanation?: string;

  @AutoMap()
  @Column({ default: true })
  isActive?: boolean;

  @AutoMap()
  @Column({ nullable: true })
  note?: string;

  @ManyToOne(() => Quiz, _quiz => _quiz.questions)
  quiz: Quiz;
}

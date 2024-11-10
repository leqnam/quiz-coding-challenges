import { DatabaseModule } from '@database/database.module';
import { MessagingModule } from '@messaging/messaging.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '@question/models/entities/question.entity';
import { QuizProfile } from '@quiz/quiz.profile';
import { Quiz } from './models/entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Quiz, Question]),
    JwtModule.register({
      // secret: jwtConstants.secret,
    }),
    MessagingModule,
  ],
  controllers: [QuizController],
  providers: [QuizService, QuizProfile],
  exports: [QuizService],
})
export class QuizModule {}

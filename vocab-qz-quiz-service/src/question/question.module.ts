import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './models/entities/question.entity';
import { QuestionController } from './question.controller';
import { JwtModule } from '@nestjs/jwt';
import { QuestionProfile } from '@question/question.profile';
import { MessagingModule } from '@messaging/messaging.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Question]),
    JwtModule.register({
      // secret: jwtConstants.secret,
    }),
    MessagingModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionProfile],
  exports: [QuestionService],
})
export class QuestionModule {}

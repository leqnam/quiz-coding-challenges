import { AnswerController } from '@answer/answer.controller';
import { AnswerProfile } from '@answer/answer.profile';
import { AnswerService } from '@answer/answer.service';
import { Answer } from '@answer/models/entities/answer.entity';
import { DatabaseModule } from '@database/database.module';
import { MessagingModule } from '@messaging/messaging.module';
import { MessagingService } from '@messaging/messaging.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from '@utils/services/date.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Answer]),
    JwtModule.register({
      // secret: jwtConstants.secret,
    }),
    MessagingModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerProfile, DateService, MessagingService],
  exports: [AnswerService],
})
export class AnswerModule {}

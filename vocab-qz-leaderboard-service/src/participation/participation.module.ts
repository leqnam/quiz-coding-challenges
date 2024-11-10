import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { DatabaseModule } from '@database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './models/entities/userquiz.entity';
import { ParticipationController } from './participation.controller';
import { JwtModule } from '@nestjs/jwt';
import { ParticipationProfile } from '@participation/participation.profile';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Participation]),
    JwtModule.register({
      // secret: jwtConstants.secret,
    }),
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService, ParticipationProfile],
  exports: [ParticipationService],
})
export class ParticipationModule {}

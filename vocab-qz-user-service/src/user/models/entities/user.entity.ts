import { AutoMap } from '@automapper/classes';
import { HistoryEntity } from '@utils/decorators/entity-history.decorator';
import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserHist } from './userHist.entity';
import * as bcrypt from 'bcrypt';
import { randomString } from '@utils/helper';

@Entity({ name: 'user' })
@HistoryEntity(UserHist)
export class User extends AbstractEntity<UserDto> {
  dtoClass = UserDto;

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @AutoMap()
  @Index()
  @Column({ nullable: true })
  name?: string;

  @AutoMap()
  @Index()
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @AutoMap()
  @Column({ nullable: true })
  mobile?: string;

  @AutoMap()
  @Column({
    type: 'date',
    nullable: true,
    comment: 'Date of Birth - Ngay sinh - Dinh dang YYYY-MM-DD',
  })
  dob?: Date;

  @AutoMap()
  @Column({ nullable: true })
  status?: string;

  @AutoMap()
  @Column({ nullable: true })
  note?: string;

  @AutoMap()
  @Column({ nullable: true })
  sessionToken?: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeUpdate()
  async updateHashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeInsert()
  generateSessionToken() {
    this.sessionToken = randomString(60);
  }
}

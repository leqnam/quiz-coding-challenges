import { AbstractEntity } from '@utils/models/entities/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Entity({ name: 'userhist' })
export class UserHist extends AbstractEntity<UserDto> {
  dtoClass = UserDto;

  @PrimaryGeneratedColumn('uuid')
  histId: string;

  @Column({ nullable: true })
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  mobile?: string;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Date of Birth - Ngay sinh - Dinh dang YYYY-MM-DD',
  })
  dob?: Date;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  note?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { transformEndOfDate } from '@utils/helper';
import { UtilsService } from '@utils/services/utils.service';
import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { AbstractDto } from '../dtos/abstract.dto';
import { AutoMap } from '@automapper/classes';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @CreateDateColumn({ name: 'createDate', type: 'timestamptz', nullable: true })
  @ApiPropertyOptional({ description: 'Ngày giờ khởi tạo' })
  @IsOptional()
  @AutoMap()
  createDate?: Date;

  @Column({ name: 'effectDate', type: 'timestamptz', nullable: true })
  @ApiProperty({ description: 'Ngày bắt đầu có hiệu lực' })
  @IsOptional()
  @Type(() => Date)
  @AutoMap()
  // @Validate(IsFutureDate)
  effectDate?: Date;

  @DeleteDateColumn({
    name: 'inactiveDate',
    type: 'timestamptz',
    nullable: true,
  })
  @ApiPropertyOptional({ description: 'Ngày hết hiệu lực' })
  @IsOptional()
  @Type(() => Date)
  @AutoMap()
  // @Validate(GreaterOrEqualDate, ['effect_date'])
  @Transform(date => transformEndOfDate(date.value))
  inactiveDate?: Date;

  @UpdateDateColumn({
    name: 'dateLastMaint',
    type: 'timestamptz',
    nullable: true,
  })
  @ApiPropertyOptional({ description: 'Ngày giờ cập nhật' })
  @IsOptional()
  @AutoMap()
  dateLastMaint?: Date;

  @VersionColumn({ name: 'version', type: 'bigint', nullable: true })
  @ApiPropertyOptional({
    description:
      "Special column that is automatically set to the entity's version (incremental number) each time you call save from entity manager or repository.",
  })
  version: number;

  @Column({ type: 'varchar', name: 'addedBy', nullable: true })
  @AutoMap()
  addedBy: string;

  @Column({ type: 'varchar', name: 'editedBy', nullable: true })
  @AutoMap()
  editedBy: string;

  @Column({ type: 'varchar', name: 'deletedBy', nullable: true })
  @AutoMap()
  deletedBy: string;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any): T {
    return UtilsService.toDto(this.dtoClass, this, options);
  }
}

import { IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { Column, FindOptionsOrder } from 'typeorm';

export class AbstractSearchDto<TEntity> {
  private _take = 10;
  private _page = 1;
  @IsString()
  @IsOptional()
  q: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  get page(): number {
    return this._page;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  @IsNumber()
  @IsOptional()
  set page(value: number) {
    this._page = value ?? 0;
  }

  @IsNumber()
  @IsOptional()
  @Column({ default: 10 })
  @Max(100)
  @Type(() => Number)
  get take(): number {
    return this._take;
  }

  set take(value: number) {
    if (!value) {
      this._take = 10;
    } else if (value > 100) {
      this._take = 100;
    } else {
      this._take = value;
    }
  }

  @IsOptional()
  orderBy: FindOptionsOrder<TEntity>;

  @IsOptional()
  exact: boolean;

  constructor() {}
}

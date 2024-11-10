export class AbstractCheckDto {
  readonly exist: boolean;

  constructor(exist: any) {
    this.exist = exist ? true : false;
  }
}

import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class QueryTransformPipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): any;
}

import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DEFAULT_RESPONSE } from '@utils/constants';
import { OkResponseDto } from '@utils/models/dtos/base-response.dto';
import { instanceToPlain } from 'class-transformer';
// import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Response<T> {}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<Response<T>>,
  ): Observable<Response<T>> {
    const resp = context.switchToHttp().getResponse();
    // const request = context.switchToHttp().getRequest();
    // Extract query parameters for paging (e.g., page and pageSize)
    return next.handle().pipe(
      map((data: any) => {
        // if data res is a file.
        if (data && data.stream) {
          return data;
        }

        const res: OkResponseDto = { ...DEFAULT_RESPONSE };
        if (data?.pageMeta) {
          res.pageMeta = data.pageMeta;
          res.responseBody = data.data;
        } else {
          res.responseBody = !data.responseBody
            ? instanceToPlain(data)
            : data.responseBody;
        }

        res.statusCode = context
          .switchToHttp()
          .getResponse()
          .statusCode.toString();
        const response: Response<T> = res;
        resp.status(HttpStatus.OK);
        return response;
      }),
    );
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { environment } from '@utils/constants';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'];
    environment.host = request.get('host');
    const fullUrl =
      request.protocol + '://' + environment.host + request.originalUrl;
    console.log(fullUrl);
    console.log('Before...');
    const now = Date.now();
    return next.handle().pipe(
      tap(data => {
        console.log(`After...\n ${Date.now() - now}ms`, data, userAgent); // you can use any logger like winston
      }),
      catchError(err => {
        console.log('Error caught from interceptor:\n', err?.response || err);
        throw err; // throwing it for client
      }),
    );
  }
}

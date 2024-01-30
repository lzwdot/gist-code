import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger = new Logger(ResponseInterceptor.name);

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug('intercept', '响应拦截器之前');

    return next.handle().pipe(
      map((data) => {
        this.logger.debug('intercept', '响应拦截器之后');

        return {
          statusCode: HttpStatus.OK,
          timestamp: new Date().toISOString(),
          data: data,
        };
      }),
      catchError((err) => {
        this.logger.debug('intercept', '响应拦截器之后');

        throw err;
      }),
    );
  }
}

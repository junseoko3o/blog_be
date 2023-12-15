import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          console.log(`Response time: ${endTime - startTime}ms`);
          if (responseTime > 30000) {
            throw new BadRequestException('time out');
          }
        })
      );
  }
}

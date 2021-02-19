import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileDefinition } from 'src/model/file-definition';

@Injectable()
export class FileFinalizingInterceptor implements NestInterceptor {
    constructor(readonly cbBefore: (file?: FileDefinition) => void, readonly cbAfter: (file?: FileDefinition) => void) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.cbBefore(context.switchToHttp().getRequest().file);
    return next
      .handle()
      .pipe(
          tap(() => {
              this.cbAfter(context.switchToHttp().getRequest().file);
            }),
      );
  }
}

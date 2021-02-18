import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileValidatingInterceptor implements NestInterceptor {
    constructor(readonly cb: (file?: {
        /** Field name specified in the form */
        fieldname: string;
        /** Name of the file on the user's computer */
        originalname: string;
        /** Encoding type of the file */
        encoding: string;
        /** Mime type of the file */
        mimetype: string;
        /** Size of the file in bytes */
        size: number;
        /** The folder to which the file has been saved (DiskStorage) */
        destination: string;
        /** The name of the file within the destination (DiskStorage) */
        filename: string;
        /** Location of the uploaded file (DiskStorage) */
        path: string;
        /** A Buffer of the entire file (MemoryStorage) */
        buffer: Buffer;
    }) => void) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
          tap(() => {
              const ctx = context.switchToHttp();
              this.cb(ctx.getRequest().file);
            }),
      );
  }
}

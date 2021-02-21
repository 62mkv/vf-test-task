import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileDefinition } from 'src/model/file-definition';

@Injectable()
export class FileControlInterceptor implements NestInterceptor {
    constructor(readonly cb: (file?: FileDefinition) => void, readonly mode: ControlMode) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        if (this.mode === ControlMode.BEFORE) {
            this.cb(context.switchToHttp().getRequest().file);
            return next.handle();
        }

        if (this.mode == ControlMode.AFTER) {
            return next
                .handle()
                .pipe(
                    tap(() => {
                        this.cb(context.switchToHttp().getRequest().file);
                    }),
                );
        }

        if (this.mode == ControlMode.FINALLY) {
            return next
                .handle()
                .pipe(
                    finalize(() => {
                        this.cb(context.switchToHttp().getRequest().file);
                    })
                );
        }
    }
}

export enum ControlMode {
    BEFORE,
    AFTER,
    FINALLY
}
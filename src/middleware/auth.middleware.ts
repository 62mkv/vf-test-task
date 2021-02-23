import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigProvider } from 'src/config/config.provider';
import { SignatureService } from 'src/service/signature.service';

const X_AUTH_CLIENT = 'x-auth-client';
const X_SIGNATURE = 'x-signature';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private config: ConfigProvider, private signatureService: SignatureService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.isClientHeaderValid(req)) {
        throw new HttpException("Invalid client", HttpStatus.BAD_REQUEST);
    }
    if (!this.isSignatureValid(req)) {
        throw new HttpException("Invalid signature", HttpStatus.BAD_REQUEST);
    } else {
        next();
    }
  }

  isClientHeaderValid(req: Request): boolean {
      return req.get(X_AUTH_CLIENT) === this.config.getAuthClient();
  }

  isSignatureValid(req: any): boolean {
      return this.signatureService.checkSignature(req.rawBody, req.get(X_SIGNATURE));
  }

}

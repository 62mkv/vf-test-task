import * as crypto from "crypto";
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

const X_AUTH_CLIENT = 'x-auth-client';
const X_SIGNATURE = 'x-signature';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}

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
      return req.get(X_AUTH_CLIENT) === this.configService.get('X_AUTH_CLIENT');
  }

  isSignatureValid(req: Request): boolean {
      return req.get(X_SIGNATURE) === this.calculateSignature(req);
  }

  calculateSignature(req: any): string {
      const secret = this.configService.get('X_PRIVATE_KEY');
      const payload = req.rawBody;
      const signature = crypto.createHash('sha256');
      signature.update(Buffer.from(payload, 'utf8'));
      signature.update(Buffer.from(secret, 'utf8'));
      return signature.digest('hex');
  }
}
